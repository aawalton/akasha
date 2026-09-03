import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeAssemble = {
  id: "01a064f6-a793-7d40-b075-7d7a7f1f133a",
  pageTypeSlug: "module",
  slug: "page-tree-assemble",
  definition: "the tree of page types and page property types a page query answer is turned into",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A property definition names its owner under a qualifier rather than under a bare slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "An owner is looked up under a qualified key rather than under the bare slug inside.",
    },
    {
      invariantKind: "departure",
      statement: "A kind node's path is taken from the `types` answer rather than composed here.",
    },
    {
      invariantKind: "departure",
      statement: "A kind the `types` answer does not hold keeps a null path and opens nothing.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The vocabulary root is the page type `page-property` rather than `page-property-type`.",
    },
    {
      invariantKind: "departure",
      statement: "Kinds are ordered by their slug alone with no kind sorted ahead of the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose `at` names no repository and no path inside is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A row missing a slug or a kind is skipped without a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type extending itself or a slug no answer held is left unreached rather than made a root.",
    },
    {
      invariantKind: "departure",
      statement:
        "An unreached name is an owner no answer held rather than an owner the lookup missed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An assembly holding two nodes with one id is refused rather than returned to the editor.",
    },
    {
      invariantKind: "absence",
      statement: "A repeated id reaches nothing but the refusal.",
    },
  ],
} as const satisfies Module
