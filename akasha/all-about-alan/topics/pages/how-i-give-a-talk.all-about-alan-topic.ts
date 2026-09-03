import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIGiveATalk = {
  id: "01a06559-9d65-75cf-a1b0-2154ba5ef275",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-give-a-talk",
  title: "How I Give A Talk",
  definition:
    "carrying a set of small points that fire when the room calls for them, rather than a script",
  parentSlugs: ["how-i-remember-anything"],
  settled:
    "Nothing is memorised word for word, so there is nothing I depend on remembering.\n\nEach point is small and paired with the circumstance that should fire it, and the order comes from the room.\n\nThinking broadly first is what keeps the set from running out when the talk goes somewhere I did not expect.\n\nIt costs me exact phrasing and some working memory during the talk, and saves me all of the recall.",
  unsettled:
    "How a point gets built, added, dropped, split or merged has never been described.\n\nHow many I carry for a talk, and how that scales with the breadth of the topic, is unrecorded.\n\nWith rehearsal off the table, what stands in for it, running the set or anticipating the room or both, is unsettled.",
} as const satisfies AllAboutAlanTopic
