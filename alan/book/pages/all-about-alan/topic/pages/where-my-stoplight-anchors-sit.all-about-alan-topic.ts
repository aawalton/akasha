import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereMyStoplightAnchorsSit = {
  id: "01a0c595-aebd-7ab8-8ceb-dcaed0311dab",
  type: "page-type/all-about-alan-topic",
  slug: "where-my-stoplight-anchors-sit",
  title: "Where My Stoplight Anchors Sit",
  definition: "what the colours on a stoplight bar of mine are pinned to, and why they move",
  parents: ["all-about-alan-topic/how-well-i-can-measure"],
  related: [
    "all-about-alan-topic/the-colours-i-read-myself-in",
    "all-about-alan-topic/mana-bar",
    "all-about-alan-topic/stamina-bar",
  ],
  settled:
    "A stoplight of mine is pinned to my own distribution rather than to anything absolute. Yellow is my middle, and green and red are each about a standard deviation out from it.\n\nSo the anchors move when the distribution moves. Recovery raising my baseline recalibrates them.\n\nI expect to redefine them several times over before a bar of mine climbs off the stoplight and onto numbered levels.",
} as const satisfies AllAboutAlanTopic
