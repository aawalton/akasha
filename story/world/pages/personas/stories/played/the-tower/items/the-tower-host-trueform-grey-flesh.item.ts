import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHostTrueformGreyFlesh = {
  id: "01a0d3d0-d41b-7a2e-8aeb-48ea5d906a74",
  type: "page-type/item",
  slug: "the-tower-host-trueform-grey-flesh",
  title: "Grey flesh",
  story: "story-played/the-tower",
  character: "character-other/the-tower-host-trueform",
  slot: "item-slot/chest",
  description: "Lean grey flesh, cold, with nothing worn over it once the mantle is shed.",
} as const satisfies Item
