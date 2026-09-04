import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const clusterProvisioning = {
  id: "01a0675b-16d9-7eab-a110-f106ca00dad1",
  pageTypeSlug: "domain",
  slug: "cluster-provisioning",
  definition: "bringing an empty cluster up to where the pipeline can run",
  partSlugs: [
    "domain/bootstrap-layers",
    "workspace-package/talos",
    "shell-script/generate-certs",
    "certificate-authority/cluster-ca",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "`pipeline-orchestrator` is not in the chain.",
    },
    {
      invariantKind: "departure",
      statement:
        "`pipeline-orchestrator` ships as steps in the main pipeline's `preparation` workflow.",
    },
  ],
} as const satisfies Domain
