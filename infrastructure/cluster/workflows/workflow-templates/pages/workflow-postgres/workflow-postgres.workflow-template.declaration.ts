import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { IMAGES, REGISTRY } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { secretPlaceApply } from "@akasha/workflow-language/secret-place"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"
import type { Step } from "@akasha/workflow-language/workflow-types"

const IMAGE_TAG_CNPG = `${REGISTRY}/cluster/postgres-cnpg:18-ts2.24-pgcron-pgnet-wal2json-pgjsonschema-r1`

const GFS_PROMOTER_IMAGE_TAG = `${REGISTRY}/cluster/postgres-gfs-promoter:r4`

const ANNUAL_DUMP_IMAGE_TAG = `${REGISTRY}/cluster/postgres-annual-dump:r1`

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap postgres-pipeline-state -n postgres -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

function cnpgClusterSteps(skipCheck: readonly string[]): readonly Step[] {
  return [
    {
      ...step({
        name: "postgres-mirror-s3-creds",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: () => [
          "set -e",
          "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
            'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
            'metadata:{name:"postgres-cnpg-backup-s3",namespace:"postgres"},' +
            "data:{access_key:.data.access_key,secret_key:.data.secret_key}}' | " +
            "kubectl apply -f -",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...step({
        name: "postgres-apply-objectstore",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -n postgres -f infra/k8s/src/postgres-cnpg/generated/postgres-cnpg-objectstore.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-namespace", "postgres-mirror-s3-creds"],
    },

    {
      ...applyRbac({
        name: "postgres-apply-cnpg-rbac",
        rbacFile: "infrastructure/cluster/manifests/postgres-rbac/postgres-rbac.module.code.ts",
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...secretPlaceApply({
        name: "postgres-apply-cnpg-secret",
        namespace: "postgres",
        resource: "postgres-cnpg-superuser",
        type: "kubernetes.io/basic-auth",
        labels: { "cnpg.io/reload": "true" },
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...secretPlaceApply({
        name: "postgres-apply-grafana-ro-secret",
        namespace: "postgres",
        resource: "grafana-ro-password",
        type: "kubernetes.io/basic-auth",
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...secretPlaceApply({
        name: "postgres-apply-agent-adhoc-secret",
        namespace: "postgres",
        resource: "agent-adhoc-password",
        type: "kubernetes.io/basic-auth",
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...step({
        name: "postgres-apply-cnpg-cluster",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -n postgres -f infra/k8s/src/postgres-cnpg/generated/postgres-cnpg-cluster.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "postgres-apply-cnpg-rbac",
        "postgres-apply-cnpg-secret",
        "postgres-apply-grafana-ro-secret",
        "postgres-apply-agent-adhoc-secret",
        "postgres-apply-objectstore",
        "postgres-apply-pv",
      ],
    },

    {
      ...step({
        name: "postgres-apply-scheduledbackup",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -n postgres -f infra/k8s/src/postgres-cnpg/generated/postgres-cnpg-scheduledbackup.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-cnpg-cluster"],
    },
  ]
}

function gfsPromoterSteps(skipCheck: readonly string[]): readonly Step[] {
  return [
    {
      ...buildkitBuild({
        name: "postgres-gfs-promoter-build-image",
        context: ".",
        dockerfile: "infrastructure/backup-retention",
        tag: GFS_PROMOTER_IMAGE_TAG,
        cache: false,
        image: IMAGES.CI,
        preCommands: (ci) => [
          `bun ${ci.workspace}/infrastructure/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts --service gfs-promoter`,
        ],
      }),
      skipIfTagExists: () => GFS_PROMOTER_IMAGE_TAG,
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...step({
        name: "postgres-apply-gfs-promoter",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -f infrastructure/backup-retention/gfs-promoter/generated/cronjob.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "postgres-apply-namespace",
        "postgres-apply-secrets",
        "postgres-mirror-s3-creds",
        "postgres-gfs-promoter-build-image",
      ],
    },

    {
      ...step({
        name: "postgres-mirror-longtail-db",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl get secret postgres-secrets -n postgres -o json | " +
            'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
            'metadata:{name:"postgres-longtail-db",namespace:"seaweedfs"},' +
            "data:{DATABASE_URL:.data.DATABASE_URL}}' | " +
            "kubectl apply -f -",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-secrets"],
    },

    {
      ...step({
        name: "postgres-apply-backup-longtail",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -f infrastructure/backup-retention/seaweedfs-backup-longtail/generated/cronjob.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-mirror-longtail-db", "postgres-gfs-promoter-build-image"],
    },
  ]
}

function annualDumpSteps(skipCheck: readonly string[]): readonly Step[] {
  return [
    {
      ...buildkitBuild({
        name: "postgres-annual-dump-build-image",
        context: "infrastructure/postgres-annual-dump",
        dockerfile: "infrastructure/postgres-annual-dump/postgres-annual-dump-image",
        filename: "Containerfile",
        tag: ANNUAL_DUMP_IMAGE_TAG,
        cache: false,
      }),
      skipIfTagExists: () => ANNUAL_DUMP_IMAGE_TAG,
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...step({
        name: "postgres-apply-annual-dump",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...skipCheck,
          "kubectl apply --server-side --force-conflicts -f infrastructure/postgres-annual-dump/generated/cronjob.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "postgres-apply-namespace",
        "postgres-mirror-s3-creds",
        "postgres-apply-cnpg-secret",
        "postgres-annual-dump-build-image",
      ],
    },
  ]
}

const foundationPostgres = workflow("postgres", {
  kind: "foundation",
  dependsOn: ["ci-images", "preparation", "seaweedfs", "cloudnative-pg"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "postgres-apply-namespace",
      namespace: "postgres",
      files: "infra/k8s/src/postgres-cnpg/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...step({
        name: "postgres-apply-pv",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/postgres-cnpg/generated/postgres-cnpg-pv.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...secretPlaceApply({
        name: "postgres-apply-secrets",
        namespace: "postgres",
        resource: "postgres-secrets",
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    {
      ...buildkitBuild({
        name: "postgres-build-cnpg-image",
        context: "infra/k8s/src/postgres-cnpg/build-cnpg",
        dockerfile: "infra/k8s/src/postgres-cnpg/build-cnpg",
        tag: IMAGE_TAG_CNPG,
        cache: false,
      }),
      dependsOn: ["postgres-apply-namespace"],
    },

    ...cnpgClusterSteps(SKIP_CHECK),

    {
      ...step({
        name: "postgres-apply-service",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n postgres -f infra/k8s/src/postgres-cnpg/generated/postgres-service.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["postgres-apply-secrets"],
    },

    ...gfsPromoterSteps(SKIP_CHECK),
    ...annualDumpSteps(SKIP_CHECK),

    {
      ...step({
        name: "postgres-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap postgres-pipeline-state -n postgres --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap postgres-pipeline-state -n postgres pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "postgres-apply-secrets",
        "postgres-apply-service",
        "postgres-apply-pv",
        "postgres-apply-cnpg-cluster",
        "postgres-mirror-s3-creds",
        "postgres-apply-objectstore",
        "postgres-apply-scheduledbackup",
        "postgres-gfs-promoter-build-image",
        "postgres-apply-gfs-promoter",
        "postgres-mirror-longtail-db",
        "postgres-apply-backup-longtail",
        "postgres-annual-dump-build-image",
        "postgres-apply-annual-dump",
      ],
    },
  ],
})

export const workflows = [foundationPostgres]
