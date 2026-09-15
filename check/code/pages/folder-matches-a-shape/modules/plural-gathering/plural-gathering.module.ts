import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pluralGathering = {
  id: "01a0a5c5-2740-7000-ad2c-5227a60870b1",
  type: "module",
  slug: "plural-gathering",
  definition: "the page types gathering their pages under each plural name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type gathers its pages under the plural that page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating no plural gathers its pages under no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "More than one page type gathers its pages under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is read as the change leaves that page type.",
    },
  ],
} as const satisfies Module
