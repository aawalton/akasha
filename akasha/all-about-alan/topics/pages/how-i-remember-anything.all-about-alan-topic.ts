import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIRememberAnything = {
  id: "01a06559-9d65-7615-99ee-ddcd2c23191d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-remember-anything",
  title: "How I Remember Anything",
  definition:
    "one thing cueing the next, all the way through, with nothing stored to be called up freely",
  parentSlugs: ["alan"],
  relatedSlugs: ["how-my-attention-works", "how-a-skill-gets-into-me"],
  settled:
    "A cue fires and brings the next thing, which is itself the cue for the one after.\n\nThe same shape runs three places: memorising a text, giving a talk, and reading the next act off the state of my system.\n\nNesting the cues lets me re-enter a text at any level, and stops one missed word breaking the whole chain.\n\nIt carries across discrete symbols and does not carry across movement.",
  unsettled:
    "What makes a cue miss, and whether one ever fires and brings the wrong thing, has no reliability anchor.\n\nThe shape of the trees I build when memorising, how wide, how deep, and how the level cues get chosen, is undescribed.\n\nWhere the trick stops working across all three uses, rather than symbols against movement alone, is unprobed.\n\nMost people store a thing together with the room they learned it in and I do not. Whether that absence reaches past skills and imagery is unknown.",
} as const satisfies AllAboutAlanTopic
