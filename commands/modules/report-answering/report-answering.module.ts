import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const reportAnswering = {
  id: "01a08e22-2013-7910-a541-1201b64bba98",
  pageTypeSlug: "module",
  type: "module",
  slug: "report-answering",
  definition: "a command's answer built from lines it gathers, or from the fault that stopped it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Lines gathered without a fault are the report, and the code is zero.",
    },
    {
      invariantKind: "departure",
      statement: "A fault thrown while gathering is the one refusal, and the code is three.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries a report or a refusal, never both.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what the lines say or where they came from.",
    },
  ],
} as const satisfies Module
