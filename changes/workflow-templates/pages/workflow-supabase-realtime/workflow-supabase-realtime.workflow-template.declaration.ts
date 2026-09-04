import { checksumHashCommands } from "@akasha/workflow-language/checksum-hash"
import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { retryTransientDdl } from "@akasha/workflow-language/retry-transient-ddl"
import { SECRETS, secret } from "@akasha/workflow-language/secrets"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { step } from "@akasha/workflow-language/step"
import { verifyRolloutCommands } from "@akasha/workflow-language/verify-rollout"
import { workflow } from "@akasha/workflow-language/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap supabase-realtime-pipeline-state -n supabase-realtime -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("supabase-realtime", {
  kind: "foundation",
  dependsOn: ["postgres", "gotrue", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "supabase-realtime-apply-namespace",
      namespace: "supabase-realtime",
      files: "infra/k8s/src/supabase-realtime/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "supabase-realtime-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/supabase-realtime-rbac/supabase-realtime-rbac.module.code.ts",
      }),
      dependsOn: ["supabase-realtime-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "supabase-realtime-apply-realtime-secrets",
        namespace: "supabase-realtime",
        secretFile:
          "service-system/cluster-services/pages/supabase-realtime/realtime.k8s-secret.sops.yaml",
      }),
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `DECRYPTED=$(sops -d ${ci.workspace}/service-system/cluster-services/pages/supabase-realtime/realtime.k8s-secret.sops.yaml)`,
        `echo "$DECRYPTED" | kubectl apply --dry-run=client -n supabase-realtime -f -`,
        `echo "$DECRYPTED" | kubectl apply -n supabase-realtime -f -`,
      ],
      dependsOn: ["supabase-realtime-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "supabase-realtime-apply-admin-secrets",
        namespace: "postgres",
        secretFile:
          "service-system/cluster-services/pages/supabase-realtime/supabase-realtime-admin.k8s-secret.sops.yaml",
      }),
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `DECRYPTED=$(sops -d ${ci.workspace}/service-system/cluster-services/pages/supabase-realtime/supabase-realtime-admin.k8s-secret.sops.yaml)`,
        `echo "$DECRYPTED" | kubectl apply --dry-run=client -n postgres -f -`,
        `echo "$DECRYPTED" | kubectl apply -n postgres -f -`,
      ],
      dependsOn: ["supabase-realtime-apply-namespace"],
    },

    {
      ...step({
        name: "supabase-realtime-ensure-admin-role",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          'JOB_NAME="ensure-supabase-realtime-admin-role-${CONTENT_HASH:0:8}"',
          "kubectl delete job -n postgres $JOB_NAME 2>/dev/null || true",
          "cat <<ENSURE | kubectl apply -f -",
          "apiVersion: batch/v1",
          "kind: Job",
          "metadata:",
          "  name: $JOB_NAME",
          "  namespace: postgres",
          "spec:",
          "  backoffLimit: 2",
          "  ttlSecondsAfterFinished: 300",
          "  template:",
          "    spec:",
          "      restartPolicy: Never",
          "      containers:",
          "        - name: ensure",
          "          image: postgres:18",
          "          env:",
          "            - name: PGHOST",
          "              value: postgres.postgres.svc.cluster.local",
          "            - name: PGPORT",
          '              value: "5432"',
          "            - name: PGUSER",
          "              value: postgres",
          "            - name: PGDATABASE",
          "              value: postgres",
          "            - name: PGPASSWORD",
          "              valueFrom:",
          "                secretKeyRef:",
          "                  name: postgres-secrets",
          "                  key: POSTGRES_PASSWORD",
          "            - name: SUPABASE_REALTIME_ADMIN_PASSWORD",
          "              valueFrom:",
          "                secretKeyRef:",
          "                  name: supabase-realtime-admin-secrets",
          "                  key: SUPABASE_REALTIME_ADMIN_PASSWORD",
          "          command:",
          "            - sh",
          "            - -c",
          "            - |",
          ...retryTransientDdl({
            indent: "              ",
            heredocEscaped: true,
            label: "ensure-supabase-realtime-admin-role",
            body: [
              "psql -v ON_ERROR_STOP=1 -v pass=\"\\$SUPABASE_REALTIME_ADMIN_PASSWORD\" <<'SQL'",
              "SELECT EXISTS(SELECT 1 FROM pg_roles WHERE rolname='supabase_realtime_admin') AS role_exists \\gset",
              "\\if :role_exists",
              "  ALTER ROLE supabase_realtime_admin WITH LOGIN REPLICATION SUPERUSER PASSWORD :'pass';",
              "\\else",
              "  CREATE ROLE supabase_realtime_admin WITH LOGIN REPLICATION SUPERUSER PASSWORD :'pass';",
              "\\endif",
              "SQL",
              'psql -v ON_ERROR_STOP=1 -Atc "SELECT rolsuper FROM pg_roles WHERE rolname=\'supabase_realtime_admin\'" | grep -qx t || { echo "ERROR: supabase_realtime_admin is not SUPERUSER after ALTER — realtime.subscription_check_filters needs SUPERUSER for its information_schema scan; see infra/k8s/src/supabase-realtime/CLAUDE.md"; exit 1; }',
              "psql -v ON_ERROR_STOP=1 -c 'GRANT CREATE, CONNECT ON DATABASE postgres TO supabase_realtime_admin'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT USAGE ON SCHEMA public TO supabase_realtime_admin'",
              "psql -v ON_ERROR_STOP=1 -c 'CREATE SCHEMA IF NOT EXISTS _realtime AUTHORIZATION supabase_realtime_admin'",
              "psql -v ON_ERROR_STOP=1 -c 'CREATE SCHEMA IF NOT EXISTS realtime AUTHORIZATION supabase_realtime_admin'",
              'echo "supabase_realtime_admin role configured"',
            ],
          }),
          "ENSURE",
          "kubectl wait --for=condition=complete -n postgres job/$JOB_NAME --timeout=120s",
          "kubectl logs -n postgres job/$JOB_NAME",
          "kubectl delete job -n postgres $JOB_NAME 2>/dev/null || true",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "supabase-realtime-apply-realtime-secrets",
        "supabase-realtime-apply-admin-secrets",
      ],
    },

    {
      ...step({
        name: "supabase-realtime-apply-realtime-manifests",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n supabase-realtime -f infra/k8s/src/supabase-realtime/generated/service.generated.yaml",
          ...checksumHashCommands({
            variable: "SECRET_HASH",
            read: `sops -d ${ci.workspace}/service-system/cluster-services/pages/supabase-realtime/realtime.k8s-secret.sops.yaml`,
            subject: "realtime.k8s-secret.sops.yaml",
          }),
          `sed "s|checksum/realtime-secrets:.*|checksum/realtime-secrets: \\"${"$"}{SECRET_HASH}\\"|" infra/k8s/src/supabase-realtime/generated/deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n supabase-realtime -f -`,
          ...verifyRolloutCommands({
            namespace: "supabase-realtime",
            deployment: "realtime",
            timeout: "240s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["supabase-realtime-ensure-admin-role"],
    },

    {
      ...step({
        name: "supabase-realtime-bootstrap-tenant",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          REALTIME_URL: "http://realtime.supabase-realtime.svc.cluster.local:4000",
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `bun ${ci.workspace}/infrastructure/cluster-manifests/realtime-tenant-bootstrap/realtime-tenant-bootstrap.module.code.ts`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["supabase-realtime-apply-realtime-manifests"],
    },

    {
      ...step({
        name: "supabase-realtime-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap supabase-realtime-pipeline-state -n supabase-realtime --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap supabase-realtime-pipeline-state -n supabase-realtime pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "supabase-realtime-apply-realtime-secrets",
        "supabase-realtime-apply-admin-secrets",
        "supabase-realtime-ensure-admin-role",
        "supabase-realtime-apply-realtime-manifests",
        "supabase-realtime-bootstrap-tenant",
      ],
    },
  ],
})
