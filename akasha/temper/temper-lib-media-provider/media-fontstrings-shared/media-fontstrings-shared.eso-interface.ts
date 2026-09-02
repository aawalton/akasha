import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaFontstringsShared = {
  id: "01a06069-f8c3-797e-8648-09bc838750c0",
  pageTypeSlug: "eso-interface",
  slug: "media-fontstrings-shared",
  definition: "the font names every language mode shares, each pointing through the font path",
  markup: "xml",
  loadedAs: "fontstrings_shared.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A font name here is built on the font path the platform sets.",
    },
    {
      invariantKind: "departure",
      statement: "This document is read after the two font path documents.",
    },
  ],
} as const satisfies EsoInterface
