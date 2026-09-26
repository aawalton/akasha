import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const cornerstoneDecisionContract = {
  id: "01a0dee5-5ff8-7810-9301-7ef94cab4611",
  type: "page-type/world-mechanic",
  slug: "cornerstone-decision-contract",
  title: "The Decision Contract",
  world: "world/cornerstone",
  description:
    "Each chapter ends on exactly one reader decision, and its type is picked from the Waking Stone's state by priority: a decision fires because state crossed a threshold, never because a chapter felt like pausing. First, BUILD awakens a new Faculty, taking a dormant Faculty from Depth 0 to 1 for one Wakefulness. It fires when any awakenable Faculty is still dormant and no Faculty sits un-anchored at Depth 1, and the reader chooses which sense wakes next by choosing what structure the settlers raise. Second, RECRUIT has a townsfolk anchor a Faculty, raising a Faculty at Depth 1 or 2 by one and marking it anchored, for one Wakefulness. It fires when a newly woken Faculty sits un-anchored at Depth 1 or 2 and a fitting newcomer has arrived, and the reader chooses who becomes the living focus that sharpens that sense. Third, RESEARCH is the fallthrough, firing when neither BUILD nor RECRUIT is legal. It deepens a chosen Faculty by one for one Wakefulness, or, once two Faculties are at Depth 3 or more, it may instead fuse two Faculties into a Power.",
} as const satisfies WorldMechanic
