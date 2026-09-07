import type { ChangeMechanicalData } from "../../../data/change-mechanical-data.page-type.ts"

export const addPropertyValue = {
  id: "01a07932-2568-72a6-8b8e-314ac44c417b",
  pageTypeSlug: "change-mechanical-data",
  slug: "add-property-value",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/page-property",
  definition: "one value put into one page property in a page's body",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is put after the values the property already holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a property holds many values is read from the body rather than from the type.",
    },
    {
      invariantKind: "departure",
      statement: "A property holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "departure",
      statement: "Putting a second value into a property holding one value is a restatement.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property holds already is refused rather than held twice.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no such key gains that key rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains is written after the property `after` names.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains is written last where `after` names no such property.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains is written last where no `after` is stated.",
    },
    {
      invariantKind: "departure",
      statement: "`after` is left unread where the page already states the key.",
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
  ],
} as const satisfies ChangeMechanicalData
