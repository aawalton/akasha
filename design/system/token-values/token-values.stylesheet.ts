import type { Stylesheet } from "akasha/code-system/stylesheets/stylesheet.page-type.types.ts"

export const tokenValues = {
  id: "01a05c95-564a-74a9-b2c1-09d527a8f63e",
  pageTypeSlug: "stylesheet",
  type: "stylesheet",
  slug: "token-values",
  definition: "the custom properties every color, space and measure is read from",
  styles: "css",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every color here is the hex the color page of that color states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The surfaces are soot and charcoal and graphite and slate and ash, in that order.",
    },
    {
      invariantKind: "departure",
      statement: "Primary is chalk, secondary is silver, and tertiary is stone.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow here is the lowest surface at an alpha rather than a color of its own.",
    },
    {
      invariantKind: "gap",
      statement: "No check has a color here to the color page that color is read from.",
    },
  ],
} as const satisfies Stylesheet
