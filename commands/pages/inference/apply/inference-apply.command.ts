import type { Command } from "../../../command.page-type.types.ts"

export const inferenceApply = {
  id: "01a0685e-fd50-7c88-a455-821aa2281969",
  pageTypeSlug: "command",
  type: "command",
  slug: "inference-apply",
  definition: "the command bringing each host's inference services to what the registry declares",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [],
  helpNotes: [
    "the services are the ones the registry declares, grouped by the host each names.",
    "these hosts are outside the cluster, and each service is reached over ssh and held by launchd.",
    "a service already at the hash its inputs carry is applied again by nothing.",
    "the answer is how many were applied, how many were passed over, and how many were taken away.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The services applied are the services the registry declares.",
    },
    {
      invariantKind: "departure",
      statement: "A service at the hash its inputs have is applied again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A managed service the registry no longer declares is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A host is reconciled whole rather than one service at a time.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here touches a cluster workload.",
    },
  ],
} as const satisfies Command
