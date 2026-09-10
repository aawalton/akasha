import type { Command } from "../../../command.page-type.types.ts"

export const inferencePlan = {
  id: "01a0685e-fd50-7fd6-9550-aa217e15a4b1",
  pageTypeSlug: "command",
  type: "command",
  slug: "inference-plan",
  definition: "the command saying what bringing the inference hosts to the registry would do",
  code: "ts",
  changeKind: "change-none",
  taking: [],
  helpNotes: [
    "this reads each host and works the reconcile out, and changes nothing on any of them.",
    "the counts are what an apply would do rather than what it has done.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts are the work an apply would do.",
    },
    {
      invariantKind: "departure",
      statement: "The hosts are read even though nothing on those hosts changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing on a host is written or started or taken away.",
    },
  ],
} as const satisfies Command
