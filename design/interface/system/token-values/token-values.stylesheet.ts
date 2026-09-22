import type { Stylesheet } from "akasha/code/stylesheet/stylesheet.page-type.types.ts"

export const tokenValues = {
  id: "01a05c95-564a-74a9-b2c1-09d527a8f63e",
  type: "page-type/stylesheet",
  slug: "token-values",
  definition: "the custom properties holding every color, space and measure",
  styles: "css",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every color here is the hex the color page of that color states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surfaces run soot then charcoal then graphite then slate then ash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Primary is chalk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Secondary is silver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tertiary is stone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shadow here is the lowest surface at an alpha rather than a color of its own.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No check has a color here to the color page that color is read from.",
    },
  ],
} as const satisfies Stylesheet
