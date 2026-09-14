import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addPageProperty = {
  id: "01a08174-b09a-7bbd-acf1-6892ecfb3575",
  type: "change-mechanical-file-content",
  slug: "add-page-property",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one key put into a page's body under one value rather than under a list",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-reaches-a-page"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page states already is refused rather than stated anew.",
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
      statement: "The value is written as one value rather than as a list of one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key is written after the property `after` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `after` naming no property the page states is refused rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key is written last where no `after` is stated.",
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
      invariantKind: "invariant-kind/departure",
      statement: "The passage answered is the lines the key is put into rather than the body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is put in as the body spells it rather than as a quoted string.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text that parses as no value is refused before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is text or a number or a boolean or null or a list or a record of those.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bare word is refused rather than written in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whitespace around a value is dropped before that value is read or written.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
