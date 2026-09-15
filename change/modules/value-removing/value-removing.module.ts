import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueRemoving = {
  id: "01a09c7d-7d5f-746f-8af0-c3635ccb603d",
  type: "module",
  slug: "value-removing",
  definition: "the edits taking one value out of one page property in a page's body",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property with many values keeps its key when the last value goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property with one value goes with that value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a property is required is read from the page type the page is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A required property is refused rather than taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property that could not be read as required or not is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value the property does not have is refused rather than taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The passage answered is the lines the value is taken out of rather than the body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The only text written here is the empty string.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page is taken away here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
