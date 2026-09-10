import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const addPageProperty = {
  id: "01a08174-b09a-7bbd-acf1-6892ecfb3575",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "add-page-property",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one key put into a page's body under one value rather than under a list",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key the page states already is refused rather than stated anew.",
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
      statement: "The value is written as one value rather than as a list of one.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written after the property `after` names.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written last where `after` names no such property.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written last where no `after` is stated.",
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
      invariantKind: "departure",
      statement: "The passage answered is the lines the key is put into rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "A value is put in as the body spells it rather than as a quoted string.",
    },
    {
      invariantKind: "departure",
      statement: "Text that parses as no value is refused before the body is read.",
    },
    {
      invariantKind: "departure",
      statement: "A value is text, a number, a boolean, null, a list, or a record of those.",
    },
    {
      invariantKind: "departure",
      statement: "A name is no value, so a bare word is refused rather than written in.",
    },
    {
      invariantKind: "departure",
      statement: "The whitespace around a value is dropped before that value is read or written.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
