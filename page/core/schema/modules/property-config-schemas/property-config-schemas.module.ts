import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyConfigSchemas = {
  id: "01a05b92-a9c7-7af9-b3b1-08c7b46c9a92",
  type: "page-type/module",
  slug: "property-config-schemas",
  definition: "the settings a property type's config holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A select option names the color it draws in rather than stating a shade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An option names that color by the color page's qualified address, as `color/green` is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option written before colors were here states none, so the color is optional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An option's color is held as the text of an address rather than judged against the color pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which shade a named color draws as.",
    },
  ],
} as const satisfies Module
