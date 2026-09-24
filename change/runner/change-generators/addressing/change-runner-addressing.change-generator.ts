import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const changeRunnerAddressing = {
  id: "01a0d4e9-ae65-7b67-a7d9-e3474ed7d005",
  type: "page-type/change-generator",
  slug: "change-runner-addressing",
  definition: "the map of the addresses each change runner reaches, written beside that runner",
  code: "ts",
  runsAfter: ["change-generator/value-minting"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A runner's map names every change under it whose code runs a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map is worked out again only where the change could turn an address.",
    },
  ],
} as const satisfies ChangeGenerator
