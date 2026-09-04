import { synthMulti } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"
import {
  APP_NAME,
  INSTANCE_NAME,
  MANAGED_BY,
  NAMESPACE,
  PART_OF,
} from "../registry-constants/registry-constants.module.code.ts"

const GC_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/ci:latest"

const GC_FULL_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "gc",
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const GC_RBAC_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "gc",
} as const

const GC_POD_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "gc",
} as const

const GC_SCRIPT = `set -eu
REGISTRY_URL="http://registry.registry.svc.cluster.local:5000"
RETAIN=10

log()  { echo "[gc] $*"; }
warn() { echo "[gc] WARN: $*" >&2; }

log "Starting registry tag retention (keep \${RETAIN} per repo)"

# List all repos. Capture exit + HTTP code so a failure here is loud.
catalog_body=$(mktemp)
catalog_curl_rc=0
catalog_code=$(curl -sk -o "$catalog_body" -w '%{http_code}' \\
  "\${REGISTRY_URL}/v2/_catalog") || catalog_curl_rc=$?
if [ "$catalog_curl_rc" -ne 0 ] || [ "$catalog_code" != "200" ]; then
  warn "failed to fetch catalog (curl_exit=\${catalog_curl_rc} http_code=\${catalog_code})"
  warn "  body: $(head -c 200 "$catalog_body")"
  rm -f "$catalog_body"
  exit 1
fi
repos=$(jq -r '.repositories[]?' < "$catalog_body" 2>/dev/null || true)
rm -f "$catalog_body"

total_deleted=0
total_failed=0
failed_repos=""

for repo in $repos; do
  # Get all tags. Capture exit + HTTP code; a silent skip here
  # would hide network blips, registry restarts, or auth failures.
  tags_body=$(mktemp)
  tags_curl_rc=0
  tags_code=$(curl -sk -o "$tags_body" -w '%{http_code}' \\
    "\${REGISTRY_URL}/v2/\${repo}/tags/list") || tags_curl_rc=$?
  if [ "$tags_curl_rc" -ne 0 ] || [ "$tags_code" != "200" ]; then
    warn "failed to fetch tags for \${repo} (curl_exit=\${tags_curl_rc} http_code=\${tags_code})"
    warn "  body: $(head -c 200 "$tags_body")"
    rm -f "$tags_body"
    total_failed=$((total_failed + 1))
    failed_repos="\${failed_repos} \${repo}"
    continue
  fi
  tags=$(jq -r '.tags // [] | .[]' < "$tags_body" 2>/dev/null || true)
  rm -f "$tags_body"
  # Empty tag list is legitimate (empty repo, not an error) — skip silently.
  [ -z "$tags" ] && continue

  # Classify each tag into a content-addressed "family" and prune every family
  # to the RETAIN newest independently. A prunable tag is an optional name
  # prefix plus a hex content hash: ^([a-z0-9-]+-)?[0-9a-f]{7,12}$ . The family
  # is that prefix ("" for a bare hash), derived by dropping the trailing
  # "-<hash>". Grouping by family means distinct image variants pushed to the
  # SAME repo — a bare "<hash>" app image and a "playwright-<hash>" scraper
  # image — are retained separately: each keeps its RETAIN newest, so a busy
  # family never starves another and every family's live (newest) tag is
  # protected. Non-hash tags (latest, buildcache, playwright-buildcache) match
  # nothing and are never pruned. Before this the filter was a bare
  # ^[0-9a-f]{7,12}$, so every "playwright-<hash>" tag escaped retention and
  # accumulated without bound — the registry-fill root cause this loop closes.

  # Cheap pass — classify by regex only (no network) into "family|tag" lines.
  classified=""
  for tag in $tags; do
    echo "$tag" | grep -qE '^([a-z0-9-]+-)?[0-9a-f]{7,12}$' || continue
    case "$tag" in
      *-*) fam="\${tag%-*}" ;;
      *)   fam="" ;;
    esac
    classified="\${classified}\${fam}|\${tag}\\n"
  done
  [ -z "$classified" ] && continue

  # Skip the timestamp lookups entirely unless some family exceeds RETAIN.
  need=$(printf '%b' "$classified" \\
    | awk -F'|' -v k="$RETAIN" '{c[$1]++} END{for(f in c) if(c[f]>k){print "y"; exit}}')
  [ "$need" = "y" ] || continue

  # For each eligible tag, resolve its build time from the image config blob's
  # .created (following one manifest-list indirection) — same resolution the
  # prune used before, now recorded alongside the tag's family.
  entries=""
  for tag in $tags; do
    echo "$tag" | grep -qE '^([a-z0-9-]+-)?[0-9a-f]{7,12}$' || continue
    case "$tag" in
      *-*) fam="\${tag%-*}" ;;
      *)   fam="" ;;
    esac
    manifest=$(curl -sk \\
      -H "Accept: application/vnd.oci.image.manifest.v1+json, application/vnd.docker.distribution.manifest.v2+json" \\
      "\${REGISTRY_URL}/v2/\${repo}/manifests/\${tag}")
    config_digest=$(echo "$manifest" | jq -r '.config.digest // empty')
    if [ -z "$config_digest" ]; then
      inner=$(echo "$manifest" | jq -r '.manifests[0].digest // empty')
      if [ -n "$inner" ]; then
        manifest=$(curl -sk \\
          -H "Accept: application/vnd.oci.image.manifest.v1+json, application/vnd.docker.distribution.manifest.v2+json" \\
          "\${REGISTRY_URL}/v2/\${repo}/manifests/\${inner}")
        config_digest=$(echo "$manifest" | jq -r '.config.digest // empty')
      fi
    fi
    ts=0
    if [ -n "$config_digest" ]; then
      created=$(curl -sk "\${REGISTRY_URL}/v2/\${repo}/blobs/\${config_digest}" | jq -r '.created // empty')
      if [ -n "$created" ]; then
        ts=$(date -d "$created" +%s 2>/dev/null || echo 0)
      fi
    fi
    entries="\${entries}\${fam}|\${ts}|\${tag}\\n"
  done

  # Per family (field 1): sort newest-first (field 2 desc), then mark every tag
  # past the RETAIN budget for deletion. awk's per-family count walks each
  # family in sorted order, so the first RETAIN it sees per family are kept.
  to_delete=$(printf '%b' "$entries" \\
    | sort -t'|' -k1,1 -k2,2nr \\
    | awk -F'|' -v k="$RETAIN" 'NF>=3 { c[$1]++; if (c[$1] > k) print $3 }')

  del_count=$(printf '%s\\n' $to_delete | grep -c . || true)
  [ "$del_count" -eq 0 ] && continue
  log "\${repo}: pruning \${del_count} tag(s) beyond \${RETAIN} per family"
  repo_deleted=0
  repo_failed=0

  # Resolve digest per tag; reproducible builds can produce byte-identical
  # manifests from distinct inputsHash tags, so dedupe before DELETE — a
  # second DELETE of the same digest 404s and would inflate repo_failed.
  digest_tag_pairs=""
  for tag in $to_delete; do
    digest=$(curl -sk -I \\
      -H "Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.v2+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.oci.image.manifest.v1+json" \\
      "\${REGISTRY_URL}/v2/\${repo}/manifests/\${tag}" \\
      | grep -i '^docker-content-digest:' | awk '{print $2}' | tr -d '\\r')
    if [ -z "$digest" ]; then
      warn "  \${repo}:\${tag} — could not resolve digest, skipping"
      repo_failed=$((repo_failed + 1))
      continue
    fi
    digest_tag_pairs="\${digest_tag_pairs}\${digest} \${tag}\\n"
  done

  unique_digests=$(printf '%b' "$digest_tag_pairs" | awk 'NF{print $1}' | sort -u)
  for digest in $unique_digests; do
    delete_body=$(mktemp)
    code=$(curl -sk -o "$delete_body" -w '%{http_code}' -X DELETE \\
      "\${REGISTRY_URL}/v2/\${repo}/manifests/\${digest}")
    if [ "$code" = "202" ] || [ "$code" = "200" ]; then
      repo_deleted=$((repo_deleted + 1))
    else
      warn "  DELETE \${repo}@\${digest} returned HTTP \${code}"
      warn "    body: $(head -c 200 "$delete_body")"
      repo_failed=$((repo_failed + 1))
    fi
    rm -f "$delete_body"
  done

  log "\${repo}: deleted \${repo_deleted} manifests, failed \${repo_failed}"
  total_deleted=$((total_deleted + repo_deleted))
  if [ "$repo_failed" -gt 0 ]; then
    total_failed=$((total_failed + repo_failed))
    failed_repos="\${failed_repos} \${repo}"
  fi
done

log "Tag cleanup done: \${total_deleted} deleted, \${total_failed} failed"

# Run GC even if some per-repo operations failed — partial cleanup
# still reclaims space for the repos that succeeded.
if [ "$total_deleted" -gt 0 ]; then
  log "Running garbage collection..."
  POD=$(kubectl -n registry get pods -l app.kubernetes.io/name=registry -o jsonpath='{.items[0].metadata.name}')
  kubectl -n registry exec "$POD" -- \\
    registry garbage-collect /etc/distribution/config.yml --delete-untagged
  log "Garbage collection complete"
fi

if [ "$total_failed" -gt 0 ]; then
  # Dedupe affected repo list, then exit non-zero so the Job
  # status reflects the partial failure (no silent green runs).
  affected=$(printf '%s\\n' $failed_repos | sort -u | tr '\\n' ' ')
  warn "Done with \${total_failed} failure(s) across repos:\${affected}"
  exit 1
fi

log "Done"
`

export function cronjobGcYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "registry-gc-sa",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "registry-gc",
          namespace: NAMESPACE,
          labels: GC_FULL_LABELS,
        },
      },
    },
    {
      id: "registry-gc-role",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "Role",
        metadata: {
          name: "registry-gc",
          namespace: NAMESPACE,
          labels: GC_RBAC_LABELS,
        },
        rules: [
          { apiGroups: [""], resources: ["pods"], verbs: ["get", "list"] },
          { apiGroups: [""], resources: ["pods/exec"], verbs: ["create"] },
        ],
      },
    },
    {
      id: "registry-gc-rolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "RoleBinding",
        metadata: {
          name: "registry-gc",
          namespace: NAMESPACE,
          labels: GC_RBAC_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "Role",
          name: "registry-gc",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "registry-gc",
            namespace: NAMESPACE,
          },
        ],
      },
    },
    {
      id: "registry-gc-cronjob",
      manifest: {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: {
          name: "registry-gc",
          namespace: NAMESPACE,
          labels: GC_FULL_LABELS,
        },
        spec: {
          schedule: "0 4 * * *",
          concurrencyPolicy: "Forbid",
          successfulJobsHistoryLimit: 3,
          failedJobsHistoryLimit: 3,
          jobTemplate: {
            spec: {
              backoffLimit: 1,
              activeDeadlineSeconds: 1800,
              template: {
                metadata: { labels: GC_POD_LABELS },
                spec: {
                  serviceAccountName: "registry-gc",
                  nodeSelector: workloadClassMemberSelector("build"),
                  restartPolicy: "Never",
                  containers: [
                    {
                      name: "gc",
                      image: GC_IMAGE,
                      command: ["/bin/sh", "-c", GC_SCRIPT],
                      resources: {
                        requests: { cpu: "10m", memory: "128Mi" },
                        limits: { memory: "128Mi" },
                      },
                      securityContext: {
                        runAsNonRoot: true,
                        runAsUser: 1000,
                        readOnlyRootFilesystem: true,
                        allowPrivilegeEscalation: false,
                        capabilities: { drop: ["ALL"] },
                      },
                      volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
                    },
                  ],
                  volumes: [{ name: "tmp", emptyDir: {} }],
                },
              },
            },
          },
        },
      },
    },
  ])
}
