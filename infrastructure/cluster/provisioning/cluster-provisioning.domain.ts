import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const clusterProvisioning = {
  id: "01a0675b-16d9-7eab-a110-f106ca00dad1",
  type: "domain",
  slug: "cluster-provisioning",
  definition: "bringing an empty cluster up to where the pipeline can run",
  parts: [
    "certificate-authority/cluster-ca",
    "domain/bootstrap-layers",
    "domain/talos",
    "shell-script/generate-certs",
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
