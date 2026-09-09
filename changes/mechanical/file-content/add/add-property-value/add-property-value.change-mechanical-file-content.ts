import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const addPropertyValue = {
  id: "01a07932-2568-72a6-8b8e-314ac44c417b",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "add-property-value",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value put into one page property in a page's body",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-reaches-a-page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is put after the values the property already has.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming a page that is not there refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a property has many values is read from the body rather than from the type.",
    },
    {
      invariantKind: "departure",
      statement: "A property holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "departure",
      statement: "Putting a second value into a property with one value is a restatement.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property has already is refused rather than held twice.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no such key gains that key rather than being refused.",
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
      invariantKind: "departure",
      statement: "The passage answered is the lines the value is put into rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains has one value where the caller says the property has one.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page gains is a list where the caller says nothing about the property.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
