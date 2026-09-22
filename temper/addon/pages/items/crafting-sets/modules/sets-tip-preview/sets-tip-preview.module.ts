import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipPreview = {
  id: "01a0623c-2df6-704f-aa3c-658495bc2518",
  type: "page-type/module",
  slug: "sets-tip-preview",
  definition: "an item chosen for a set and shown in a tooltip on demand",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The slash commands here are only created when LibSlashCommander is absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The search for an item loosens its criteria twice before giving up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is found by name with spaces treated as a middle dot.",
    },
  ],
} as const satisfies Module
