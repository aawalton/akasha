import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTreeAssemble = {
  id: "01a064f6-a793-7d40-b075-7d7a7f1f133a",
  type: "module",
  slug: "page-tree-assemble",
  definition: "the tree of page types a page query answer is turned into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row whose `at` names no repository and no path inside is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row missing a slug is skipped without a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type extending itself or a slug no answer held is left unreached rather than made a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unreached name is a page type no drawing reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type names any number of types above that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is drawn once under every type above that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The drawing under the first type a page type names above that page type keeps the id `type/<slug>`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A later drawing takes its id from the parent that drawing hangs under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everything under a later drawing takes its id from that drawing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type already open above the type being drawn is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring among the types above ends the descent.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A second drawing of a type is no reason to leave that type out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An assembly with two nodes with one id is refused rather than returned to the editor.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A repeated id reaches nothing but the refusal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page property and no page property type is drawn.",
    },
  ],
} as const satisfies Module
