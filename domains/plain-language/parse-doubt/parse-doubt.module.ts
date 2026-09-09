import type { Module } from "@akasha/code/module"

export const parseDoubt = {
  id: "01a07bda-ac83-7c39-a602-c808f8dabe81",
  pageTypeSlug: "module",
  type: "module",
  slug: "parse-doubt",
  definition: "why a parse of a statement is not to be trusted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A statement akasha writes states something of a subject.",
    },
    {
      invariantKind: "departure",
      statement: "A parse whose root has no subject is doubted.",
    },
    {
      invariantKind: "departure",
      statement: "A subject reached through a relation family is a subject.",
    },
    {
      invariantKind: "departure",
      statement: "A doubt names the fault rather than how sure the model was.",
    },
    {
      invariantKind: "departure",
      statement: "A parse with no doubt is sound.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a statement.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mends a parse.",
    },
  ],
} as const satisfies Module
