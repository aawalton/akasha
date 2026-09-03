import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatPullsMeIntoDoingSomething = {
  id: "01a06559-9d65-78bc-a02c-3071e18b967e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-pulls-me-into-doing-something",
  title: "What Pulls Me Into Doing Something",
  definition: "the two ways a thing gets me moving, one I feel and one I reason out",
  parentSlugs: ["how-i-decide"],
  settled:
    "One channel runs on how familiar and how new a thing is, and I only notice it afterwards.\n\nThe other runs on importance, and it is the one I can use on purpose.\n\nThe instinctive one wins when it fires, so I take urgency out of my surroundings rather than trying to override it.\n\nFamiliar alone or new alone is not enough. Both have to fire together.",
  unsettled:
    "What decides when interest crosses into actually starting is unworked, and whether both channels cross at the same point is open.\n\nThe instinctive channel is only visible afterwards. Whether a body cue or a time of day gives it away earlier is unprobed.\n\nWhere interest sits in the resource accounting is unsettled, whether it spends mana or stamina or sits outside them.\n\nWhether one dimension fires it everywhere, or which one leads shifts by context, rests on a single case.",
} as const satisfies AllAboutAlanTopic
