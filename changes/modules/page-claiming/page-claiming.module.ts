import type { Module } from "@akasha/code/module"

export const pageClaiming = {
  id: "01a078bd-ae49-7881-bdf5-084ad0327dbe",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-claiming",
  definition: "the files a page claims, read through the world a change reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page's own file leads the files answered.",
    },
    {
      invariantKind: "departure",
      statement: "A path the page claims that has no body is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A path is kept for holding a body rather than for holding text.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a body that is not text is answered beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A path claimed twice is answered once.",
    },
    {
      invariantKind: "departure",
      statement: "The world is read rather than the disk.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not answer throws rather than answering a short list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether a page may be acted on.",
    },
  ],
} as const satisfies Module
