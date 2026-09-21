import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const rulesInsteadOfABrake = {
  id: "01a06559-9d65-7f6a-bcc0-a846fb135460",
  type: "page-type/all-about-alan-topic",
  slug: "rules-instead-of-a-brake",
  title: "Rules Instead Of A Brake",
  definition: "the standing rules I use to keep myself from overreaching",
  parents: ["all-about-alan-topic/how-i-decide"],
  related: ["all-about-alan-topic/not-wanting-to-is-the-gauge"],
  settled:
    "I keep them written down because nothing in the moment tells me to stop.\n\nWhere my neurotype supplies no faculty inside, I build an explicit rule outside instead. Calling a bad stretch weather and scoring an irreversible decision on a rubric are the same move.\n\nSubstituting an outside governor for a missing inside one is genuinely hard, and I do not always manage it.",
} as const satisfies AllAboutAlanTopic
