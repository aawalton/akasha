import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaPcBackupfontDe = {
  id: "01a06069-f8c4-7f77-9415-831c11b81963",
  pageTypeSlug: "eso-interface",
  slug: "media-pc-backupfont-de",
  definition: "the fallback fonts a Windows or Mac client loads for German",
  markup: "xml",
  loadedAs: "PC/backupfont_de.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
