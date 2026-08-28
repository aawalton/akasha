import { IMAGES } from "../../tools/lib/workflow-dsl/images.ts"
import { step } from "../../tools/lib/workflow-dsl/step.ts"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply.ts"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply.ts"
import { retryTransientDdl } from "../../tools/lib/workflow-dsl/templates/retry-transient-ddl.ts"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt.ts"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout.ts"
import { workflow } from "../../tools/lib/workflow-dsl/workflow.ts"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap gotrue-pipeline-state -n gotrue -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("gotrue", {
  kind: "foundation",
  dependsOn: ["postgres", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "gotrue-apply-namespace",
      namespace: "gotrue",
      files: "infra/k8s/src/gotrue/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "gotrue-apply-rbac",
        rbacFile: "tools/lib/rbac/gotrue.ts",
      }),
      dependsOn: ["gotrue-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "gotrue-apply-supabase-auth-admin-secrets",
        namespace: "postgres",
        secretFile: "infra/k8s/src/gotrue/supabase-auth-admin.k8s-secret.sops.yaml",
      }),
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/gotrue/supabase-auth-admin.k8s-secret.sops.yaml)`,
        `echo "$DECRYPTED" | kubectl apply --dry-run=client -n postgres -f -`,
        `echo "$DECRYPTED" | kubectl apply -n postgres -f -`,
      ],
      dependsOn: ["gotrue-apply-namespace"],
    },

    {
      ...step({
        name: "gotrue-ensure-auth-schema",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          'JOB_NAME="ensure-auth-schema-${CONTENT_HASH:0:8}"',
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
          "            - name: SUPABASE_AUTH_ADMIN_PASSWORD",
          "              valueFrom:",
          "                secretKeyRef:",
          "                  name: supabase-auth-admin-secrets",
          "                  key: SUPABASE_AUTH_ADMIN_PASSWORD",
          "          command:",
          "            - sh",
          "            - -c",
          "            - |",
          ...retryTransientDdl({
            indent: "              ",
            heredocEscaped: true,
            label: "ensure-auth-schema",
            body: [
              "psql -v ON_ERROR_STOP=1 -c 'CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION postgres'",
              "psql -v ON_ERROR_STOP=1 -v pass=\"\\$SUPABASE_AUTH_ADMIN_PASSWORD\" <<'SQL'",
              "SELECT EXISTS(SELECT 1 FROM pg_roles WHERE rolname='supabase_auth_admin') AS role_exists \\gset",
              "\\if :role_exists",
              "  ALTER ROLE supabase_auth_admin WITH LOGIN PASSWORD :'pass' CREATEROLE NOINHERIT;",
              "\\else",
              "  CREATE ROLE supabase_auth_admin WITH LOGIN PASSWORD :'pass' CREATEROLE NOINHERIT;",
              "\\endif",
              "SQL",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT ALL PRIVILEGES ON SCHEMA auth TO supabase_auth_admin'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT supabase_auth_admin TO authenticator'",
              'echo "auth schema + supabase_auth_admin configured"',
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
      dependsOn: ["gotrue-apply-supabase-auth-admin-secrets"],
    },

    {
      ...step({
        name: "gotrue-apply-manifests",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n gotrue -f infra/k8s/src/gotrue/generated/service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n gotrue -f infra/k8s/src/gotrue/generated/deployment.generated.yaml",
          ...verifyRolloutCommands({ namespace: "gotrue", deployment: "gotrue", timeout: "180s" }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["gotrue-ensure-auth-schema"],
    },

    {
      ...step({
        name: "gotrue-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap gotrue-pipeline-state -n gotrue --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap gotrue-pipeline-state -n gotrue pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "gotrue-apply-supabase-auth-admin-secrets",
        "gotrue-ensure-auth-schema",
        "gotrue-apply-manifests",
      ],
    },
  ],
})
