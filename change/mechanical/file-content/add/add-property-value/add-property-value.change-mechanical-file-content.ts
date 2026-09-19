import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addPropertyValue = {
  id: "01a07932-2568-72a6-8b8e-314ac44c417b",
  type: "page-type/change-mechanical-file-content",
  slug: "add-property-value",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value put into one page property in a page's body",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is put after the values a property already has, whatever order those values are in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page that is not there refuses the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a property has many values is read from the body rather than from the type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding one value is refused rather than made a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Putting a second value into a property with one value is a restatement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the property has already is refused rather than held twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no such key gains that key rather than being refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is judged before the body is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key spelled as a slug is refused rather than gained under that spelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the key that spelling makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key that is no bare word is refused rather than gained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page gains is written after the property `after` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `after` naming no property the page states is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page gains is written last where no `after` is stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An `after` stated where the page states the key already is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body exporting no object is refused rather than gaining a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The passage answered is the lines the value is put into rather than the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here walks the index, opens a page, or looks for a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page gains has one value where the caller says the property has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page gains is a list where the caller says nothing about the property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The literal a value is written as is worked out by the module this change names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that kind does not hold is refused before the body is read.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
