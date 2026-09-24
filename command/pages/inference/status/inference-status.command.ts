import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceStatus = {
  id: "01a0685e-fd50-76e0-b6ac-f0ce4a4a1e98",
  type: "page-type/command",
  slug: "inference-status",
  definition: "the command reading what managed inference services each host is actually holding",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The services reported are the services the host has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service is reported by whether its directory, its conda environment and its launchd job are there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hash beside a service is the hash of the inputs that host was last given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every host whose page says it serves inference is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host with no managed service is said so.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes a host.",
    },
  ],
  name: "status",
  arguments: [],
} as const satisfies Command
