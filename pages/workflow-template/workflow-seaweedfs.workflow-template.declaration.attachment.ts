import { IMAGES } from "../../tools/lib/workflow-dsl/images.ts"
import { step } from "../../tools/lib/workflow-dsl/step.ts"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash.ts"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply.ts"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply.ts"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt.ts"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout.ts"
import { workflow } from "../../tools/lib/workflow-dsl/workflow.ts"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap seaweedfs-pipeline-state -n seaweedfs -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

const MASTER = "infra/seaweedfs/master/generated"
const VOLUME = "infra/seaweedfs/volume/generated"
const FILER = "infra/seaweedfs/filer/generated"
const S3_GATEWAY = "infra/seaweedfs/s3-gateway/generated"
const BACKUP_CNPG = "infra/seaweedfs/backup-cnpg/generated"
const BACKUP_BULK = "infra/seaweedfs/backup-bulk/generated"
const BACKUP_ASSETS = "infra/seaweedfs/backup-assets/generated"
const ETCD_SNAPSHOT = "infra/seaweedfs/etcd-snapshot/generated"

const foundationSeaweedfs = workflow("seaweedfs", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "seaweedfs-apply-namespace",
      namespace: "seaweedfs",
      files: `${MASTER}/namespace.generated.yaml`,
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "seaweedfs-apply-rbac",
        rbacFile: "tools/lib/rbac/seaweedfs.ts",
      }),
      dependsOn: ["seaweedfs-apply-namespace"],
    },

    {
      ...step({
        name: "seaweedfs-apply-pv",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          `kubectl apply --server-side --force-conflicts -f ${MASTER}/pv.generated.yaml`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-rbac"],
    },

    {
      ...kubectlApply({
        name: "seaweedfs-apply-pvc",
        namespace: "seaweedfs",
        files: `${MASTER}/pvc.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: ["seaweedfs-apply-pv"],
    },

    {
      ...step({
        name: "seaweedfs-ensure-creds-secret",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "if kubectl get secret seaweedfs-creds -n seaweedfs >/dev/null 2>&1; then",
          '  echo "seaweedfs-creds already present — leaving intact"',
          "  exit 0",
          "fi",
          'echo "generating seaweedfs-creds"',
          "AK=$(head -c 15 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 20)",
          "SK=$(head -c 30 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 40)",
          'printf "%s" "$AK" > /tmp/sw-ak',
          'printf "%s" "$SK" > /tmp/sw-sk',
          'jq -n --arg ak "$AK" --arg sk "$SK" \'{ identities: [ { name: "default", credentials: [ { accessKey: $ak, secretKey: $sk } ], actions: ["Admin", "Read", "Write", "List", "Tagging"] } ] }\' > /tmp/sw-s3.json',
          "kubectl create secret generic seaweedfs-creds -n seaweedfs " +
            "--from-file=access_key=/tmp/sw-ak " +
            "--from-file=secret_key=/tmp/sw-sk " +
            "--from-file=s3-config.json=/tmp/sw-s3.json",
          "rm -f /tmp/sw-ak /tmp/sw-sk /tmp/sw-s3.json",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-namespace"],
    },

    {
      ...step({
        name: "seaweedfs-apply-services",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${MASTER}/service.generated.yaml`,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${VOLUME}/service.generated.yaml`,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${FILER}/service.generated.yaml`,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${S3_GATEWAY}/service.generated.yaml`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-namespace"],
    },

    {
      ...step({
        name: "seaweedfs-apply-master",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${MASTER}/master.generated.yaml`,
          ...verifyRolloutCommands({
            namespace: "seaweedfs",
            deployment: "master",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "seaweedfs-apply-pvc",
        "seaweedfs-apply-services",
        "seaweedfs-ensure-creds-secret",
      ],
    },
    {
      ...step({
        name: "seaweedfs-apply-volume",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${VOLUME}/volume.generated.yaml`,
          ...verifyRolloutCommands({
            namespace: "seaweedfs",
            deployment: "volume",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-master"],
    },
    {
      ...step({
        name: "seaweedfs-apply-filer",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `kubectl apply --server-side --force-conflicts -n seaweedfs -f ${FILER}/filer.generated.yaml`,
          ...verifyRolloutCommands({
            namespace: "seaweedfs",
            deployment: "filer",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-volume"],
    },
    {
      ...step({
        name: "seaweedfs-apply-s3-gateway",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: () => [
          "set -e",
          ...checksumHashCommands({
            variable: "S3_CONFIG_HASH",
            read: "kubectl get secret seaweedfs-creds -n seaweedfs -o jsonpath='{.data.s3-config\\.json}'",
            subject: "seaweedfs-creds",
          }),
          `sed "s|checksum/s3-config:.*|checksum/s3-config: \\"${"$"}{S3_CONFIG_HASH}\\"|" ${S3_GATEWAY}/s3-gateway.generated.yaml | kubectl apply --server-side --force-conflicts -n seaweedfs -f -`,
          ...verifyRolloutCommands({
            namespace: "seaweedfs",
            deployment: "s3-gateway",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-filer"],
    },

    {
      ...step({
        name: "seaweedfs-ensure-bucket",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => {
          const jobName = `seaweedfs-ensure-bucket-${ci.inputsHash.slice(0, 8)}`
          const filerBase = "http://filer.seaweedfs.svc.cluster.local:8888/buckets"
          return [
            "set -e",
            `kubectl delete job -n seaweedfs ${jobName} 2>/dev/null || true`,
            "cat <<'BUCKET' | kubectl apply -f -",
            "apiVersion: batch/v1",
            "kind: Job",
            "metadata:",
            `  name: ${jobName}`,
            "  namespace: seaweedfs",
            "spec:",
            "  backoffLimit: 0",
            "  ttlSecondsAfterFinished: 120",
            "  template:",
            "    spec:",
            "      restartPolicy: Never",
            "      containers:",
            "        - name: ensure-bucket",
            "          image: curlimages/curl:8.8.0",
            "          command:",
            "            - sh",
            "            - -c",
            "            - |",
            "              set -e",
            "              for b in agent-sessions loki-chunks postgres-cnpg-backups headscale-db atlas-basemap upscale etcd-snapshots; do",
            `                curl -fsS -X POST "${filerBase}/$b/" || curl -fsS "${filerBase}/$b/"`,
            '                echo "bucket $b ready"',
            "              done",
            "BUCKET",
            `kubectl wait --for=condition=complete -n seaweedfs job/${jobName} --timeout=120s`,
            `kubectl logs -n seaweedfs job/${jobName}`,
            `kubectl delete job -n seaweedfs ${jobName} 2>/dev/null || true`,
          ]
        },
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-filer"],
    },

    {
      ...step({
        name: "seaweedfs-apply-backup-pv",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          `kubectl apply --server-side --force-conflicts -f ${MASTER}/backup-pv.generated.yaml`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["seaweedfs-apply-rbac"],
    },
    {
      ...kubectlApply({
        name: "seaweedfs-apply-backup-pvc",
        namespace: "seaweedfs",
        files: `${MASTER}/backup-pvc.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: ["seaweedfs-apply-backup-pv"],
    },
    {
      ...kubectlApply({
        name: "seaweedfs-apply-backup-cnpg",
        namespace: "seaweedfs",
        files: `${BACKUP_CNPG}/backup-cnpg.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: ["seaweedfs-apply-backup-pvc", "seaweedfs-ensure-bucket"],
    },
    {
      ...kubectlApply({
        name: "seaweedfs-apply-backup-bulk",
        namespace: "seaweedfs",
        files: `${BACKUP_BULK}/backup-bulk.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: ["seaweedfs-apply-backup-pvc", "seaweedfs-ensure-bucket"],
    },

    {
      ...kubectlApply({
        name: "seaweedfs-apply-backup-assets",
        namespace: "seaweedfs",
        files: `${BACKUP_ASSETS}/backup-assets.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: [
        "seaweedfs-apply-backup-pvc",
        "seaweedfs-apply-s3-gateway",
        "seaweedfs-ensure-bucket",
      ],
    },


    {
      ...sopsDecryptApply({
        name: "seaweedfs-apply-etcd-talosconfig",
        namespace: "seaweedfs",
        secretFile: "infra/seaweedfs/etcd-snapshot/etcd-snapshot.k8s-secret.sops.yaml",
      }),
      dependsOn: ["seaweedfs-apply-namespace"],
    },
    {
      ...kubectlApply({
        name: "seaweedfs-apply-etcd-snapshot",
        namespace: "seaweedfs",
        files: `${ETCD_SNAPSHOT}/etcd-snapshot.generated.yaml`,
        serverSide: true,
      }),
      dependsOn: [
        "seaweedfs-apply-etcd-talosconfig",
        "seaweedfs-apply-s3-gateway",
        "seaweedfs-ensure-bucket",
      ],
    },


    {
      ...step({
        name: "seaweedfs-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap seaweedfs-pipeline-state -n seaweedfs --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap seaweedfs-pipeline-state -n seaweedfs pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "seaweedfs-apply-master",
        "seaweedfs-apply-volume",
        "seaweedfs-apply-filer",
        "seaweedfs-apply-s3-gateway",
        "seaweedfs-ensure-bucket",
        "seaweedfs-apply-backup-cnpg",
        "seaweedfs-apply-backup-bulk",
        "seaweedfs-apply-etcd-snapshot",
      ],
    },
  ],
})

export const workflows = [foundationSeaweedfs]
