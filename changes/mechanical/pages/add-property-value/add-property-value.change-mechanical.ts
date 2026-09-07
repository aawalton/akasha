import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const addPropertyValue = {
  id: "01a07932-2568-72a6-8b8e-314ac44c417b",
  pageTypeSlug: "change-mechanical",
  slug: "add-property-value",
  changeModeSlug: "change-mode-add",
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
      statement: "A key the page states no value under is refused.",
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
      invariantKind: "gap",
      statement: "A page stating no such key gains that key rather than being refused.",
    },
  ],
} as const satisfies ChangeMechanical
