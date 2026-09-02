import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const potionMakerLayout = {
  id: "01a061c7-e8c5-7273-a0fd-ab5d2006c145",
  pageTypeSlug: "eso-interface",
  slug: "potion-maker-layout",
  definition: "the potion window, its filters and its result grid",
  markup: "xml",
  loadedAs: "XML/UI/PotionMaker.xml",
} as const satisfies EsoInterface
