import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildAttributes = {
  id: "01a18414-31e9-7e31-a45b-a9e067c7681a",
  type: "page-type/module",
  slug: "characters-build-attributes",
  definition: "the attribute points a target build asks for, spent in the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute respec costs nothing, so attributes are applied without asking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points only added are bought without a respec.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Points taken off any attribute start a respec and send the difference once it opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A target spending more points than the character has is refused before anything is sent.",
    },
  ],
  createdAt: "2026-10-28T19:54:38.440Z",
  updatedAt: "2026-10-28T19:54:38.440Z",
} as const satisfies Module
