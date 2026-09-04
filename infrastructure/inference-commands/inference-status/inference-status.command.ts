import type { Command } from "@akasha/command-system/command"

export const inferenceStatus = {
  id: "01a0685e-fd50-76e0-b6ac-f0ce4a4a1e98",
  pageTypeSlug: "command",
  slug: "inference-status",
  definition: "the command reading what managed inference services each host is actually holding",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "each host is asked in turn, and what it says is reported under its name and address.",
    "a service is reported by whether its directory, its conda env and its launchd job are there.",
    "the hash beside a service is the hash of the inputs the host was last given.",
    "a host holding no managed service is said so rather than left out.",
    "this is what the host holds rather than what the registry declares.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is reported is what the host holds.",
    },
    {
      invariantKind: "departure",
      statement: "Every declared host is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A host holding no managed service is said so.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a host.",
    },
  ],
} as const satisfies Command
