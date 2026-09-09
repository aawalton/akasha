import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renamePageAddresses = {
  id: "01a082a8-d622-77d8-aafa-a0c97bdc6f64",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-page-addresses",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "many pages' addresses restated by reading each body once",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every address handed in is restated over one reading of the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is found by the parse rather than by matching the text of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed only where its text spells the page type of an address.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling no address handed in is read and left alone.",
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
      statement: "A body a machine writes spelling an address is restated too.",
    },
    {
      invariantKind: "departure",
      statement: "An address handed in that is no address refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "An address handed in as its own new address refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no address at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A slug naming a page without its page type is left as that slug is.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
