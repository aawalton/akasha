import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const colorBadgeVariant = {
  id: "01a0c501-134c-7c7e-ab5f-bcd62d76c5ee",
  type: "page-type/module",
  slug: "color-badge-variant",
  definition: "the badge variant a named color draws as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The badge picks the shade for a named color rather than reading the color's hex.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Green, blue, purple, yellow, orange and red each draw as the variant of that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Black and soot draw as the badge's surface variant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Charcoal, graphite, slate, stone and ash draw as the badge's elevation variant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grey, silver, chalk and text draw as the badge's muted elevation variant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is named here by importing its page, so a rename of that page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A color named by its slug alone is read as that color, as a qualified address is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address under another page type names no color here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A color named nothing here answers nothing, so its caller keeps the variant it had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The variant answered is the badge's own rather than the narrower one a color rule takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The color pages a test holds to naming a variant are read off the index rather than listed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a badge.",
    },
  ],
} as const satisfies Module
