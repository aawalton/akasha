import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renamePropertySignature = {
  id: "01a07718-c9b6-74eb-b71b-e0d52b81f5b7",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-property-signature",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property respelled is named as the type it sits on and then the property.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing alone is refused, since one file declares one name on two types.",
    },
    {
      invariantKind: "departure",
      statement: "A star in place of the type names every type the file declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A star is asked for rather than fallen into, so the caller says it means them all.",
    },
    {
      invariantKind: "departure",
      statement: "A file declaring no type at all is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose types state that property nowhere is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A type already stating the name asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property declared outside the file as well is refused.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
