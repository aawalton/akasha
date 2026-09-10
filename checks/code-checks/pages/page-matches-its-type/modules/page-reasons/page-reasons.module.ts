import type { Module } from "@akasha/code/module"

export const pageReasons = {
  id: "01a08c0e-0449-7f41-9132-874bda8f8428",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-reasons",
  definition: "the reasons a page's values give against what its page type declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property the page type requires and does not fill is asked of the page.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type does not declare refuses the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value a page type declares uncommitted, secret, fixed or worked out is on no page.",
    },
    {
      invariantKind: "departure",
      statement: "A property is keyed by what its own property page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list is judged for its count, for its repeats, and for the length of each entry.",
    },
    {
      invariantKind: "departure",
      statement: "A value is judged by the length and the name format its property page states.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration's length narrows the length its property states.",
    },
    {
      invariantKind: "departure",
      statement: "A property named as excused is not asked of the page.",
    },
    {
      invariantKind: "departure",
      statement: "A name format is asked for only where a property states one.",
    },
  ],
} as const satisfies Module
