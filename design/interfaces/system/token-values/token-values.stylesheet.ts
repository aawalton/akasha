import type { Stylesheet } from "akasha/code/stylesheets/stylesheet.page-type.types.ts"

export const tokenValues = {
  id: "01a05c95-564a-74a9-b2c1-09d527a8f63e",
  type: "stylesheet",
  slug: "token-values",
  definition: "the custom properties every color, space and measure is read from",
  styles: "css",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every color here is the hex the color page of that color states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The surfaces run soot then charcoal then graphite then slate then ash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Primary is chalk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Secondary is silver.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Tertiary is stone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shadow here is the lowest surface at an alpha rather than a color of its own.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No check has a color here to the color page that color is read from.",
    },
  ],
} as const satisfies Stylesheet
