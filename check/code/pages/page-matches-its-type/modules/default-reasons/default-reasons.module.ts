import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const defaultReasons = {
  id: "01a0d92f-63ba-76fe-9d0d-0e162214cbc7",
  type: "page-type/module",
  slug: "default-reasons",
  definition: "the reasons a declaration's default gives against the kind its property holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A default a boolean or a number property holds is a boolean or a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default a relation holds names a page by that page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default a select property holds is one of the values that property offers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default a file property holds is one of the extensions that property takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default a one-of property holds is what one of its members holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default any other property holds is text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether the page a relation's default names is there.",
    },
  ],
} as const satisfies Module
