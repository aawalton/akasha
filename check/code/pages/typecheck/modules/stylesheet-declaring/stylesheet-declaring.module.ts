import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stylesheetDeclaring = {
  id: "01a0d5ad-4797-792c-9f12-3a00cd314a19",
  type: "page-type/module",
  slug: "stylesheet-declaring",
  definition: "the declarations a compiler is served for the stylesheets a program imports",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet that is there is served an empty declaration beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet that is not there is served no declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet in the tree is looked for where the change leaves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet in the packages folder is looked for on the disk.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The bundler's client types declare every stylesheet a module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A declaration outside the tree is served without a line answering every stylesheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No declaration answers every stylesheet, so one not there resolves to nothing.",
    },
  ],
} as const satisfies Module
