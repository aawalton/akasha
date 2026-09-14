import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addPropertyRecord = {
  id: "01a081d9-419a-72bf-ae0b-5318df5fce07",
  type: "change-mechanical-file-content",
  slug: "add-property-record",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one record put into one page property in a page's body",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-reaches-a-page"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record is put in as the body spells it rather than as a quoted string.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record field naming a page that is not there refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a record falls in the property is worked out by the module this change names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text that parses as no record is refused before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal shows one record rather than describing the form.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whitespace around a record is dropped before that record is read or written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record the property spells already is refused rather than held twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no such key gains that key rather than being refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is judged before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key spelled as a slug is refused rather than gained under that spelling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the key that spelling makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key that is no bare word is refused rather than gained.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page gains is written after the property `after` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `after` naming no property the page states is refused rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body exporting no object is refused rather than gaining a key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads what the record means.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record spelling a key with quotes that key does not need is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An `after` stated where the page states the key already is refused rather than dropped.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
