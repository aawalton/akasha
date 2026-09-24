import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const stylesheet = {
  id: "01a05b01-48b1-72b3-961d-f31190becdc7",
  type: "page-type/page-type",
  slug: "stylesheet",
  definition: "the rules dressing what a browser shows",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "stylesheet" }],
  parts: [
    "file-property/reached",
    "file-property/styles",
    "change-generator/source-globbing",
    "change-generator/color-writing",
    "record-property/stylesheet-colors",
    "relation-property/stylesheet-color",
    "text-property/stylesheet-color-name",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/styles", required: true, many: false },
    { pageProperty: "file-property/reached", required: false, many: false, uncommitted: true },
    {
      pageProperty: "record-property/stylesheet-colors",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet's rules are a page property held in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stylesheet is its own page rather than a property of the components the stylesheet dresses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One stylesheet dresses as many components as name the stylesheet's classes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A component is dressed by naming a class rather than by importing a stylesheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A component imports a stylesheet only to make a bundler emit the stylesheet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet page names the components its rules dress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet is formatted and linted by the run that reads a body of code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet is held to the same byte ceiling as any other file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A stylesheet declares nothing a compiler could type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment in a stylesheet is refused as prose in code is.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A specifier naming a stylesheet that is not there is refused by the typechecker.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
