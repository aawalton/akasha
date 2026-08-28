import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { retryTransientDdl } from "../../tools/lib/workflow-dsl/templates/retry-transient-ddl"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap postgrest-pipeline-state -n postgrest -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("postgrest", {
  kind: "foundation",
  dependsOn: ["postgres", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "postgrest-apply-namespace",
      namespace: "postgrest",
      files: "infra/k8s/src/postgrest/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "postgrest-apply-rbac",
        rbacFile: "tools/lib/rbac/postgrest.ts",
      }),
      dependsOn: ["postgrest-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "postgrest-apply-secrets",
        namespace: "postgrest",
        secretFile: "infra/k8s/src/postgrest/postgrest.k8s-secret.sops.yaml",
      }),
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/postgrest/postgrest.k8s-secret.sops.yaml)`,
        `echo "$DECRYPTED" | kubectl apply --dry-run=client -n postgrest -f -`,
        `echo "$DECRYPTED" | kubectl apply -n postgrest -f -`,
      ],
      dependsOn: ["postgrest-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "postgrest-apply-authenticator-secrets",
        namespace: "postgres",
        secretFile: "infra/k8s/src/postgrest/authenticator.k8s-secret.sops.yaml",
      }),
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/postgrest/authenticator.k8s-secret.sops.yaml)`,
        `echo "$DECRYPTED" | kubectl apply --dry-run=client -n postgres -f -`,
        `echo "$DECRYPTED" | kubectl apply -n postgres -f -`,
      ],
      dependsOn: ["postgrest-apply-namespace"],
    },

    {
      ...step({
        name: "postgrest-ensure-authenticator-role",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          'JOB_NAME="ensure-authenticator-role-${CONTENT_HASH:0:8}"',
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
          "            - name: AUTHENTICATOR_PASSWORD",
          "              valueFrom:",
          "                secretKeyRef:",
          "                  name: authenticator-secrets",
          "                  key: AUTHENTICATOR_PASSWORD",
          "          command:",
          "            - sh",
          "            - -c",
          "            - |",
          ...retryTransientDdl({
            indent: "              ",
            heredocEscaped: true,
            label: "ensure-authenticator-role",
            body: [
              "psql -v ON_ERROR_STOP=1 -c 'ALTER ROLE authenticator WITH LOGIN'",
              "psql -v ON_ERROR_STOP=1 -c \"ALTER ROLE authenticator WITH PASSWORD '\\$AUTHENTICATOR_PASSWORD'\"",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT anon, authenticated, service_role TO authenticator'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role'",
              "psql -v ON_ERROR_STOP=1 -c 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role'",
              'echo "supabase roles configured"',
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
      dependsOn: ["postgrest-apply-secrets", "postgrest-apply-authenticator-secrets"],
    },

    {
      ...step({
        name: "postgrest-apply-manifests",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n postgrest -f infra/k8s/src/postgrest/generated/service.generated.yaml",
          ...checksumHashCommands({
            variable: "SECRET_HASH",
            read: `sops -d ${ci.workspace}/infra/k8s/src/postgrest/postgrest.k8s-secret.sops.yaml`,
            subject: "postgrest-secrets.sops.yaml",
          }),
          `sed "s|checksum/postgrest-secrets:.*|checksum/postgrest-secrets: \\"${"$"}{SECRET_HASH}\\"|" infra/k8s/src/postgrest/generated/deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n postgrest -f -`,
          ...verifyRolloutCommands({
            namespace: "postgrest",
            deployment: "postgrest",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgrest-ensure-authenticator-role"],
    },

    {
      ...step({
        name: "postgrest-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap postgrest-pipeline-state -n postgrest --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap postgrest-pipeline-state -n postgrest pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "postgrest-apply-secrets",
        "postgrest-apply-authenticator-secrets",
        "postgrest-ensure-authenticator-role",
        "postgrest-apply-manifests",
      ],
    },
  ],
})
