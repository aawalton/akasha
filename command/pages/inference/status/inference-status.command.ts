import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceStatus = {
  id: "01a0685e-fd50-76e0-b6ac-f0ce4a4a1e98",
  type: "command",
  slug: "inference-status",
  definition: "the command reading what managed inference services each host is actually holding",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The services reported are the services the host has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service is reported by whether its directory, its conda environment and its launchd job are there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hash beside a service is the hash of the inputs that host was last given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every declared host is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A host with no managed service is said so.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes a host.",
    },
  ],
  name: "status",
  arguments: [],
} as const satisfies Command
