import type { Module } from "@akasha/code/module"

export const domainDrawing = {
  id: "01a07c03-68a7-7fca-91e7-b541e1efa8cb",
  pageTypeSlug: "module",
  slug: "domain-drawing",
  definition: "the domains read off their pages, drawn as a tree or handed over whole",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A domain is a page of the `domain` page type rather than a page with a slug.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is a `domain/<slug>` part named by the domain with that part.",
    },
    {
      invariantKind: "departure",
      statement: "A root is a domain no domain names as a part.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming no domain page is drawn and marked rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A slug named that has no domain page throws.",
    },
    {
      invariantKind: "departure",
      statement: "A tree or a subject holding nothing throws rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is a kind of domain where any type that page type names above that page type is.",
    },
    {
      invariantKind: "departure",
      statement: "A domain open above the point being drawn is marked rather than drawn again.",
    },
    {
      invariantKind: "absence",
      statement: "A domain drawn elsewhere is no domain open above the point being drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A thrown reason is handed back as a refusal with that reason.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
