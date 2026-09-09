import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removePropertyRecord = {
  id: "01a081ee-32aa-7960-8703-4e32e6a02a7e",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "remove-property-record",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one record taken out of one page property in a page's body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The record taken out is the one whose named field states the text handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A key with no record is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Text no record states under that field is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Text more than one record states under that field is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says how many records state it.",
    },
    {
      invariantKind: "departure",
      statement: "A property keeps its key when the last record goes.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The passage answered is the lines the record is taken out of rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the record means.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
