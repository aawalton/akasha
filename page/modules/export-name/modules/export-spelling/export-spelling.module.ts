import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportSpelling = {
  id: "01a09413-a04a-7d1a-9b1f-ec1b3e2a3762",
  type: "module",
  slug: "export-spelling",
  definition: "the exports a page's own files carry under the name that page's slug makes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's own file is spelled anew where it exports the type its slug names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's code file is spelled anew where it exports the name its slug makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file exporting neither name is spelled nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no code file has no code file spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is read as exported from a declaration rather than from an export list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that spells the name nowhere is read no further than that.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change or writes a body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
