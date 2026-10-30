import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const changeRunnerAddressing = {
  id: "01a0d4e9-ae65-7b67-a7d9-e3474ed7d005",
  type: "page-type/change-generator",
  slug: "change-runner-addressing",
  definition:
    "how code writes the arguments of each change a change runner runs beside that change runner",
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
  createdAt: "2026-09-24T19:34:39.461Z",
  updatedAt: "2026-10-30T17:41:24.236Z",
} as const satisfies ChangeGenerator
