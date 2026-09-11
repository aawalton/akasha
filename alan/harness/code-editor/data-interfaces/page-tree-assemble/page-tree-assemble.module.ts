import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageTreeAssemble = {
  id: "01a064f6-a793-7d40-b075-7d7a7f1f133a",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-tree-assemble",
  definition: "the tree of page types a page query answer is turned into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row whose `at` names no repository and no path inside is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A row missing a slug is skipped without a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type extending itself or a slug no answer held is left unreached rather than made a root.",
    },
    {
      invariantKind: "departure",
      statement: "An unreached name is a page type no drawing reached.",
    },
    {
      invariantKind: "departure",
      statement: "A page type names any number of types above that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is drawn once under every type above that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The drawing under the first type a page type names above that page type keeps the id `type/<slug>`.",
    },
    {
      invariantKind: "departure",
      statement: "A later drawing takes its id from the parent that drawing hangs under.",
    },
    {
      invariantKind: "departure",
      statement: "Everything under a later drawing takes its id from that drawing.",
    },
    {
      invariantKind: "departure",
      statement: "A type already open above the type being drawn is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A ring among the types above ends the descent.",
    },
    {
      invariantKind: "absence",
      statement: "A second drawing of a type is no reason to leave that type out.",
    },
    {
      invariantKind: "departure",
      statement:
        "An assembly with two nodes with one id is refused rather than returned to the editor.",
    },
    {
      invariantKind: "absence",
      statement: "A repeated id reaches nothing but the refusal.",
    },
    {
      invariantKind: "absence",
      statement: "No page property and no page property type is drawn.",
    },
  ],
} as const satisfies Module
