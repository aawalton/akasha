import type { Module } from "@akasha/code-system/module"

export const filePageTypeConfig = {
  id: "01a05bd6-c52f-7e97-a8ea-067913e34725",
  pageTypeSlug: "module",
  slug: "file-page-type-config",
  definition: "what a file-backed page type states about how its pages are shown",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a page type states under a key is asked of the pages by that page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the property page's key rather than as the property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page type names one page type above it or several.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page type states nothing under is asked of the page types above it.",
    },
    {
      invariantKind: "departure",
      statement: "The page types above are asked a level at a time, the nearest level first.",
    },
    {
      invariantKind: "departure",
      statement: "A key is answered from the nearest page type above that states it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where two page types above state a key and are equally near, the one named last is answered from.",
    },
    {
      invariantKind: "departure",
      statement: "Twenty page types is as many as are asked before a key is given up on.",
    },
    {
      invariantKind: "departure",
      statement: "A page type already asked is not asked again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name above that is no page type here ends that one branch rather than the search.",
    },
    {
      invariantKind: "departure",
      statement: "A page type above is reached by the slug ending the address naming it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A question the pages refuse is raised rather than read as a page type stating no value.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page type declares no property for is refused by the pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tree where no page type states a media config is refused rather than read as empty.",
    },
    {
      invariantKind: "gap",
      statement: "The `page-type` page type declares no `sequence`.",
    },
    {
      invariantKind: "gap",
      statement: "No page type states a media config.",
    },
    {
      invariantKind: "absence",
      statement: "No answer here is held for a later question.",
    },
  ],
} as const satisfies Module
