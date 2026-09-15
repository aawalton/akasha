import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changePropertyRecordField = {
  id: "01a081da-03ff-76a3-b753-0344b352daa3",
  type: "change-mechanical-file-content",
  slug: "change-property-record-field",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "one field of one record a page's many-valued property has, stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The record worked is the one whose named field states the text handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field stated anew to name a page that is not there refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key with no record is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text no record states under that field is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text more than one record states under that field is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal says how many records state it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record stating no text under the field worked is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The passage answered is the lines the field's value sits on rather than the body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
