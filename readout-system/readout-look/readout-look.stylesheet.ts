import type { Stylesheet } from "@akasha/code-system/stylesheet"

export const readoutLook = {
  id: "01a05b01-48b2-799e-b213-1859233baef5",
  pageTypeSlug: "stylesheet",
  slug: "readout-look",
  definition: "how a reading and the rung it reached are dressed in a browser",
  styles: "css",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung is one custom property naming one color.",
    },
    {
      invariantKind: "departure",
      statement: "The rung a ring reached picks its arc through the data attribute the ring wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A reading reaching no rung is dressed as the track is.",
    },
    {
      invariantKind: "departure",
      statement: "The ring takes its size from a custom property so a caller may move the size.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a widget or a page.",
    },
  ],
} as const satisfies Stylesheet
