import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReasons = {
  id: "01a08c0e-0449-7f41-9132-874bda8f8428",
  type: "module",
  slug: "page-reasons",
  definition: "the reasons a page's values give against what its page type declares",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property the page type requires and does not fill is asked of the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type does not declare refuses the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A value a page type declares uncommitted or secret or fixed or worked out is on no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property is keyed by the slug its own property page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list is judged for its count and for its repeats and for the length of each entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is judged by the length and the name format its property page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration's length narrows the length its property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property named as excused is not asked of the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name format is asked for only where a property states a name format.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value whose property declares no field is judged against that group's members.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value whose property declares fields and is no record gives a reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value whose property declares a group's members alone gives no such reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record whose property names members is judged against the member whose fields it fits.",
    },
  ],
} as const satisfies Module
