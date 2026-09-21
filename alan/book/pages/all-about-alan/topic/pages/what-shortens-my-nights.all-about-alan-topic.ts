import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatShortensMyNights = {
  id: "01a06559-9d65-7684-b991-311139eafe41",
  type: "page-type/all-about-alan-topic",
  slug: "what-shortens-my-nights",
  title: "What Shortens My Nights",
  definition: "what cuts a night short",
  parents: ["all-about-alan-topic/sleep"],
  settled:
    "Stress takes the end of the night and the medication takes the start, so a short night says which one did it.\n\nStress moves my waking earlier and leaves my bedtime where it was. Vyvanse moves my falling asleep later and leaves my waking where it was.\n\nBefore Vyvanse, with low stress, nine to ten hours. Before Vyvanse, under high stress, six and a half.\n\nOn Vyvanse with low stress, eight to nine. That is about an hour lost off the front.\n\nOn Vyvanse under high stress, six to seven. Both mechanisms compose, an hour off the front and the rest off the back.\n\nSo if the night was short and I went to bed late, it was the medication. If the night was short and I woke early, it was stress.",
} as const satisfies AllAboutAlanTopic
