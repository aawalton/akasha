import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperAddonColor = {
  id: "01a090aa-713f-7e38-a2a0-680e407092d0",
  type: "domain",
  slug: "temper-addon-color",
  definition: "the four numbers an add-on keeps a color as",
  parts: ["module/unpack-color"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color is four numbers, in red, green, blue, alpha order.",
    },
    {
      invariantKind: "departure",
      statement: "A number a color is missing reads as full.",
    },
  ],
} as const satisfies Domain
