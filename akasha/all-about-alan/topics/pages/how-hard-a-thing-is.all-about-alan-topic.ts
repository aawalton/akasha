import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howHardAThingIs = {
  id: "01a06559-9d65-7c0b-aee2-9f2d6f58096c",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-hard-a-thing-is",
  title: "How Hard A Thing Is",
  definition: "how demanding an activity is, as a rung rather than a feeling",
  parentSlugs: ["what-an-activity-costs-me"],
  settled:
    "Its rung is what my safety level gets compared against.\n\nMy projects have a base of rung two, and rebuilding the foundational layers under them raises the difficulty above that base.",
  unsettled:
    "Where the ladder tops out is open. Door-knocking in a foreign language sits above criticism, and that label may be two things rather than one rung.\n\nThe downward probe assumes an ordered list of easier things to walk down. Is that list these rungs, or a finer personal ordering I actually step through?\n\nThe rebuild was priced at rung three in a question I answered rather than in my own words. Abby's note: he confirmed the cost at that framing without naming the rung, so three is unconfirmed.",
} as const satisfies AllAboutAlanTopic
