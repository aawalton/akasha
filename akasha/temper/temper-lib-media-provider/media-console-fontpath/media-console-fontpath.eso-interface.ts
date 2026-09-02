import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const mediaConsoleFontpath = {
  id: "01a06069-f8c2-76ab-b89e-8605c12ac960",
  pageTypeSlug: "eso-interface",
  slug: "media-console-fontpath",
  definition: "the folder the client reads fonts from on a console",
  markup: "xml",
  loadedAs: "Console/fontpath.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The font path is declared as a string the other documents read.",
    },
  ],
} as const satisfies EsoInterface
