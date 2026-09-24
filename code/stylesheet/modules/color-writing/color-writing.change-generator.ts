import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const colorWriting = {
  id: "01a0d591-e237-71ef-a466-2b16cf15dffc",
  type: "page-type/change-generator",
  slug: "color-writing",
  definition: "the hex of each color a stylesheet names, written into that stylesheet's rules",
  code: "ts",
  runsAfter: ["change-generator/source-globbing"],
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A color in a stylesheet's rules is written by a machine rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color page is the side the hex is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the value of a custom property the stylesheet page names is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a custom property sits in the rules is the author's and is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A custom property the rules do not declare is said rather than added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color page stating no hex leaves its custom property as it is, and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hexes are worked out again only where a color page or a stylesheet moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet already with the body that would be written again is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is written again is answered as a change rather than as a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies ChangeGenerator
