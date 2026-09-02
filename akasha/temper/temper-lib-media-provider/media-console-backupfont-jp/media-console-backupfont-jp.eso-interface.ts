import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaConsoleBackupfontJp = {
  id: "01a06069-f8c2-73a3-bccc-0a7f6d8bc712",
  pageTypeSlug: "eso-interface",
  slug: "media-console-backupfont-jp",
  definition: "the fallback fonts a console client loads for Japanese",
  markup: "xml",
  loadedAs: "Console/backupfont_jp.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fallback font is loaded only where the client runs this language.",
    },
  ],
} as const satisfies EsoInterface
