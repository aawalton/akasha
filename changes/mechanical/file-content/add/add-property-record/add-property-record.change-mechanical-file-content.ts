import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const addPropertyRecord = {
  id: "01a081d9-419a-72bf-ae0b-5318df5fce07",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "add-property-record",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one record put into one page property in a page's body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record is put in as the body spells it rather than as a quoted string.",
    },
    {
      invariantKind: "departure",
      statement: "A record is put after the records the property already has.",
    },
    {
      invariantKind: "departure",
      statement: "A record takes the indent the record above it has.",
    },
    {
      invariantKind: "departure",
      statement: "Text that parses as no record is refused before the body is read.",
    },
    {
      invariantKind: "departure",
      statement: "The whitespace around a record is dropped before that record is read or written.",
    },
    {
      invariantKind: "departure",
      statement: "A property holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "departure",
      statement: "A record the property spells already is refused rather than held twice.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no such key gains that key rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key is judged before the body is read.",
    },
    {
      invariantKind: "departure",
      statement: "A key spelled as a slug is refused rather than gained under that spelling.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the key that spelling makes.",
    },
    {
      invariantKind: "departure",
      statement: "A key that is no bare word is refused rather than gained.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains is written after the property `after` names.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused rather than gaining a key.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the record means.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list written on one line gains its record on that line rather than on a line of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A record spelling a key with quotes that key does not need is refused.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
