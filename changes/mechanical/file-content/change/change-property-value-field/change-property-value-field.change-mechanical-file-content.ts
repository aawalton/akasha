import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changePropertyValueField = {
  id: "01a081da-03ff-76a3-b753-0344b352daa3",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-property-value-field",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/file-content-page-property-value-prose",
  definition: "one field of one record a page's many-valued property holds, stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The record worked is the one whose named field states the text handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding no record is refused.",
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
      statement: "A record stating no text under the field worked is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The passage answered is the lines the field's value sits on rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalFileContent
