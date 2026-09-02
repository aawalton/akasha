import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const scrollableMenuControls = {
  id: "01a06275-c447-7a91-b3a6-e3e6daef8679",
  pageTypeSlug: "eso-interface",
  slug: "scrollable-menu-controls",
  definition: "the row, header and dropdown controls every menu of this library is built from",
  markup: "xml",
  loadedAs: "XML/LibScrollableMenu.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One virtual control is declared for each entry type a menu row may take.",
    },
    {
      invariantKind: "departure",
      statement: "A row handler calls back into the library through the LibScrollableMenu global.",
    },
  ],
} as const satisfies EsoInterface
