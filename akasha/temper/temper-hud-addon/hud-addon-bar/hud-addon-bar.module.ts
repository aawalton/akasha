import type { Module } from "@akasha/code-system/module"

export const hudAddonBar = {
  id: "01a061c5-18dd-7007-b0fb-76457ff3f070",
  pageTypeSlug: "module",
  slug: "hud-addon-bar",
  definition: "the strip across the top of the screen the registered fields are drawn in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bar is built once.",
    },
    {
      invariantKind: "departure",
      statement: "Every field is redrawn on a fixed interval.",
    },
    {
      invariantKind: "departure",
      statement: "A field registered before the bar is built is drawn once the bar is built.",
    },
    {
      invariantKind: "departure",
      statement: "A cell stating no color is drawn in the secondary text color.",
    },
  ],
} as const satisfies Module
