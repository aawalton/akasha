import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatDoingItMyselfLooksLike = {
  id: "01a0c59b-1d0f-7658-801c-0d32b2cdc20e",
  type: "page-type/all-about-alan-topic",
  slug: "what-doing-it-myself-looks-like",
  title: "What Doing It Myself Looks Like",
  definition: "the capabilities that replace a provider, and how that trade is shaped",
  parents: ["all-about-alan-topic/the-tiers-i-can-switch-to"],
  related: [
    "all-about-alan-topic/the-garden-we-do-not-eat-from",
    "all-about-alan-topic/building-a-capability-is-not-running-on-it",
  ],
  settled:
    "Solar with a battery instead of the grid for the daily run. A garden and stored food instead of the grocers for staples. Owning the tools and learning to repair, instead of repair services and buying the thing again. Running my own services instead of renting somebody else's software. Underneath all of it, any skill that replaces something I would otherwise have paid for.\n\nThe cost is shaped differently from switching. More capital and more learning at the front, and almost nothing recurring past maintenance.\n\nThe trust burden goes to zero. There is no organisation left to grade.\n\nWhat dependencies remain are simpler and swappable. Whoever sells me the equipment, whoever sells me the materials.\n\nOver a long enough horizon it is usually the cheaper one, and the older way of framing this buried that.\n\nIt is not always available and not always cheaper. That gets judged one item at a time.",
} as const satisfies AllAboutAlanTopic
