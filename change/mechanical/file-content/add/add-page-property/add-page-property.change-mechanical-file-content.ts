import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addPageProperty = {
  id: "01a08174-b09a-7bbd-acf1-6892ecfb3575",
  type: "page-type/change-mechanical-file-content",
  slug: "add-page-property",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a key put into a page's body under one value rather than under a list",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page states already is refused rather than stated anew.",
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
      statement: "The value is written as one value rather than as a list of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is written after the property `after` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `after` naming no property the page states is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is written last where no `after` is stated.",
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
      statement: "The passage answered is the lines the key is put into rather than the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is put in as the body spells it rather than as a quoted string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text that parses as no value is refused before the body is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is text or a number or a boolean or null or a list or a record of those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bare word is refused rather than written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whitespace around a value is dropped before that value is read or written.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
