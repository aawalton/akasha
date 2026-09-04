import type { Initiative } from "../initiative.page-type.ts"

export const aranyaClusterCleanup = {
  id: "01a06cf9-0d41-7a81-b1f0-f0e645bd59f2",
  pageTypeSlug: "initiative",
  slug: "aranya-cluster-cleanup",
  domainSlug: "domain/infrastructure",
  personaSlug: "aranya",
  constraints: [
    "Cluster checks remain in checks/ for ablation.",
    "The inference family takes a top-level folder of its own rather than a home under cluster/.",
  ],
  intents: [
    {
      statement: "All cluster-specific files are in the cluster/ folder.",
      workingMemory:
        "`infrastructure/` is 839 files in 52 children and 24 packages, of which 244 are inference and leave. `service-system/cluster-services` is 130 files and no package of its own, reached through 8 subpath exports on `@akasha/service-system`. It moves with `vendored-workloads` and `secrets`, which reach into its properties for `namespace`, `resource-kind` and `resource-name`; those four edges then become internal. `web-apps` remains, extending domain rather than service.",
    },
    {
      statement: "The cluster/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`openingWith` refuses a folder whose name equals or opens with the name of the page above it, so `cluster-api`, `cluster-manifests`, `cluster-operations`, `cluster-provisioning` and `cluster-services` become `api`, `manifests`, `operations`, `provisioning` and `services`. Folder names only; slugs and npm names are untouched. `infrastructure` already fails: 26 of its 52 children are declared nowhere, and `workspace-package/git-transport` is a declared part sitting at the repo top.",
    },
    {
      statement: "The inference family sits in a top-level inference/ folder.",
      workingMemory:
        "`inference.domain.ts` says inference runs on machines outside the cluster, so 244 files leave `infrastructure/`: 12 folders and the `inference` and `generation` domain pages. `domain/inference` declares 6 of them and wants the rest added. The same prefix rule renames `inference-clients`, `inference-pool`, `inference-runs` and `inference-commands` to `clients`, `pool`, `runs` and `commands`. `upscale`, `voice-inference` and `alerts` are mixed and split rather than moved.",
    },
  ],
} as const satisfies Initiative
