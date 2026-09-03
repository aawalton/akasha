import type { Command } from "@akasha/command-system/command"

export const inferenceApply = {
  id: "01a0685e-fd50-7c88-a455-821aa2281969",
  pageTypeSlug: "command",
  slug: "inference-apply",
  definition: "the command bringing each host's inference services to what the registry declares",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [],
  helpNotes: [
    "the services are the ones the registry declares, grouped by the host each names.",
    "these hosts are outside the cluster, and each service is reached over ssh and held by launchd.",
    "a service already standing at the hash its inputs carry is applied again by nothing.",
    "a managed service the registry no longer declares is taken away.",
    "the answer is how many were applied, how many were passed over, and how many were taken away.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is applied is what the registry declares.",
    },
    {
      invariantKind: "departure",
      statement: "A service standing at the hash its inputs carry is applied again by nothing.",
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
