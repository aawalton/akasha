import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theColorOfTheFloor = {
  id: "01a0c5fe-8f87-7473-9fe0-a7eb9eb55552",
  type: "page-type/all-about-alan-topic",
  slug: "the-color-of-the-floor",
  title: "The Color Of The Floor",
  definition: "the case I use to bound what my thin data actually costs me",
  parents: ["all-about-alan-topic/what-a-model-of-mine-is-made-of"],
  settled:
    "It usually doesn't matter if I can't remember what color the floor is in a room. That kind of failure isn't very central to truth, so there isn't much loss there.\n\nThat is the bound on the thin half. The particulars I drop are mostly not the sort of thing a true model rests on, which is why the gap does not read as a general blindness.",
} as const satisfies AllAboutAlanTopic
