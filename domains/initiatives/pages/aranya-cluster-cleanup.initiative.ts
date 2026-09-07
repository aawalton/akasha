import type { Initiative } from "../initiative.page-type.ts"

export const aranyaClusterCleanup = {
  id: "01a06cf9-0d41-7a81-b1f0-f0e645bd59f2",
  pageTypeSlug: "initiative",
  slug: "aranya-cluster-cleanup",
  domainSlug: "domain/infrastructure",
  personaSlug: "aranya",
  constraints: [
    "Cluster checks remain in checks/ for ablation.",
    "A path inside a container is left as it is; only this machine's own scratch paths move to /var/tmp.",
    "What builds Kubernetes resources is named by a page type rather than by a file name suffix.",
    "Each manifest code file has a page of its own rather than being named by a path.",
    "Every cluster service's domain folder sits in cluster/services/.",
    "No secret value changes; what moves is where a value is read from rather than what the value is.",
    "A count that turns over faster than the work is re-taken rather than written into working memory.",
    "A census names what it cannot see, and a comparison is run against a seeded fault before it is believed.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "`infrastructure/cluster/` holds `api`, `provisioning`, `k8s-types` and `k8s-synth`. Left are `infrastructure/cluster-manifests`, `infrastructure/cluster-operations` and `service-system/cluster-services`, which goes to `cluster/services/` whole. Each is blocked by a file no page claims, which a move refuses: `nodes.json`, `tunnel-routes.ts`, `registry.conf` and two grafana json files. A named-file-property page claims each, the grafana pair with `runsFileLength: false`.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-manifests`, `cluster-operations` and `cluster-services` lose the prefix as each moves under `cluster/`. `api` and `provisioning` already have. Folder names only; slugs and npm names are untouched. An earlier run also failed on `tunnel-routes.ts`, `nodes.json`, an undeclared `cluster-secrets` and two domain pages in `cluster/provisioning`. Those counts are re-run rather than kept.",
    },
    {
      statement: "The workflow language and its templates sit in cluster/workflow/.",
      workingMemory:
        "Both sit under `changes/` now, beside a change system they are no part of. `workflow-cloudflared.workflow-template.declaration.ts:138` runs jq over `infrastructure/cluster-operations/nodes.json` selecting `.hostname`, and those records carry `id`, `host`, `user` and `keyPath` and no `hostname`, so that step adds no DNS record at all. The move carries that reader with it, and fixing the field is part of the move rather than a separate errand.",
    },
  ],
} as const satisfies Initiative
