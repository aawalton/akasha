import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const removePropertyValue = {
  id: "01a07758-01be-7649-a91a-f8952f0b468e",
  type: "page-type/change-mechanical-file-content",
  slug: "remove-property-value",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a value taken out of a page property in a page's body",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The module taking a value away is called rather than reached through a rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property with many values keeps its key when the last value goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property with one value goes with that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a property is required is read from the page type the page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A required property is refused rather than taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a required property away is a retype.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property that could not be read as required or not is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the property does not have is refused rather than taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The passage answered is the lines the value is taken out of rather than the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The only text written here is the empty string.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is taken away here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value handed with `where`, `is` and `field` leaves that list field of the one record matching.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No record matching and more than one record matching are each refused.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
