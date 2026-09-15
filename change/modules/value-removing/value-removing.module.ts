import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueRemoving = {
  id: "01a09c7d-7d5f-746f-8af0-c3635ccb603d",
  type: "module",
  slug: "value-removing",
  definition: "the edits taking one value out of one page property in a page's body",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property with many values keeps its key when the last value goes.",
    },
    {
      invariantKind: "departure",
      statement: "A property with one value goes with that value.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is required is read from the page type the page is.",
    },
    {
      invariantKind: "departure",
      statement: "A required property is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A property that could not be read as required or not is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not have is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The passage answered is the lines the value is taken out of rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "The only text written here is the empty string.",
    },
    {
      invariantKind: "absence",
      statement: "No page is taken away here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
