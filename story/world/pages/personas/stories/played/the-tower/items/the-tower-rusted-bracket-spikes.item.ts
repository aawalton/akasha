import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerRustedBracketSpikes = {
  id: "01a0d443-0a03-7a3e-b9aa-84820fb126e1",
  type: "page-type/item",
  slug: "the-tower-rusted-bracket-spikes",
  title: "Rusted bracket-spikes",
  story: "story-played/the-tower",
  place: "place/the-tower-cistern-walkway",
  description: "Bracket-spikes in the wall, rusted through, that crumble at a pull.",
} as const satisfies Item
