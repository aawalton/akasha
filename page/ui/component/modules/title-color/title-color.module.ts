import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const titleColor = {
  id: "01a0d410-92db-7795-a01b-b0b06cb68cae",
  type: "page-type/module",
  slug: "title-color",
  definition: "the text color a page's title is drawn in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is drawn in the color the property its page type names holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title's color is the text color a badge of that color is drawn in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose property holds no color answers no color, so its title keeps the color every title has.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a title.",
    },
  ],
} as const satisfies Module
