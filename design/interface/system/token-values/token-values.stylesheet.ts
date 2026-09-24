import type { Stylesheet } from "akasha/code/stylesheet/stylesheet.page-type.types.ts"

export const tokenValues = {
  id: "01a05c95-564a-74a9-b2c1-09d527a8f63e",
  type: "page-type/stylesheet",
  slug: "token-values",
  definition: "the custom properties holding every color, space and measure",
  styles: "css",
  colors: [
    { name: "surface-0", color: "color/soot" },
    { name: "surface-1", color: "color/charcoal" },
    { name: "surface-2", color: "color/graphite" },
    { name: "surface-3", color: "color/slate" },
    { name: "surface-4", color: "color/ash" },
    { name: "primary", color: "color/chalk" },
    { name: "secondary", color: "color/silver" },
    { name: "tertiary", color: "color/stone" },
    { name: "green", color: "color/green" },
    { name: "blue", color: "color/blue" },
    { name: "purple", color: "color/purple" },
    { name: "yellow", color: "color/yellow" },
    { name: "orange", color: "color/orange" },
    { name: "red", color: "color/red" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every color here is written from the hex of the color page named for it here.",
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
  ],
} as const satisfies Stylesheet
