import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelTheSystem = {
  id: "01a0ddf9-5938-7cdd-9f87-abeac1adbd51",
  type: "page-type/lore",
  slug: "harem-hotel-the-system",
  title: "The System",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Each person's System pane is private to that person.",
    "Alan cannot read Aria's System pane, and she cannot read his.",
    "Through the first night the System's pane spoke and showed only to Alan.",
    "The System first spoke to Aria at the Link's first activation.",
    "Aria says the System had never spoken to her before, not once in all her years.",
    "Why the System opened to Aria at the Link's activation is unknown.",
    "The System's first quest bade Alan close the distance between him and Aria.",
    "Aria received no message with the System's first quest.",
    "After the kiss, the System stated flatly what Alan crossed and what the crossing paid.",
    "The System spoke its readout without ceremony, as a ledger states a sum, then went quiet.",
    "Alan and Aria first read their own System panes at once, each seeing only their own.",
    "Aria invited Alan to lead the Link's mutual selection.",
  ],
} as const satisfies Lore
