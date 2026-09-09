import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renamePageAddress = {
  id: "01a07bd5-a749-7789-bfa6-a2a288d8f0c7",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-page-address",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one page's address restated wherever a body spells that address",
  code: "ts",
  test: "ts",
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
      statement: "A path the answer writes is read beside the paths the index lists.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer carries away is left out of the bodies read.",
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
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
