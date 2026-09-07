import type { ChangeMechanicalData } from "../../data/change-mechanical-data.page-type.ts"

export const renamePageAddress = {
  id: "01a07bd5-a749-7789-bfa6-a2a288d8f0c7",
  pageTypeSlug: "change-mechanical-data",
  slug: "rename-page-address",
  changeModeSlug: "change-mode-rename",
  definition: "one page's address restated wherever a body spells that address",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body spelling the address is restated whether or not that body is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is found by the parse rather than by matching the text of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling the address nowhere is read and left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A body a machine writes spelling the address is restated too.",
    },
    {
      invariantKind: "absence",
      statement: "A slug naming the page without its page type is left as that slug is.",
    },
  ],
} as const satisfies ChangeMechanicalData
