import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontFr = {
  id: "01a06069-f8c5-77e5-bd13-d2f143408ca0",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-fr",
  definition: "the fallback fonts a Windows or Mac client loads for French",
  markup: "xml",
  loadedAs: "PC/backupfont_fr.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
