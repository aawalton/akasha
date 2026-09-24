import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTraitReading = {
  id: "01a0d5ce-ca66-7eb3-84bc-f4874bcbbc80",
  type: "page-type/module",
  slug: "companion-trait-reading",
  definition: "every companion trait and what it is worth, read from the pages that hold them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is read from its page rather than from a copy in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a trait is worth at each quality is read from the grade pages under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The traits are put in order by the build-hash place each states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait whose stated place is not its place in that order is refused.",
    },
  ],
} as const satisfies Module
