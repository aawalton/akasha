import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainDrawing = {
  id: "01a07c03-68a7-7fca-91e7-b541e1efa8cb",
  type: "module",
  slug: "domain-drawing",
  definition: "the domains read off their pages, drawn as a tree or handed over whole",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain is a page of the `domain` page type rather than a page with a slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge is a `domain/<slug>` part named by the domain with that part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root is a domain no domain names as a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part naming no domain page is drawn and marked rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug named that has no domain page throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree or a subject holding nothing throws rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is a kind of domain where any type that page type names above that page type is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain open above the point being drawn is marked rather than drawn again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A domain drawn elsewhere is no domain open above the point being drawn.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a command line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
