import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const havingAdhd = {
  id: "01a06559-9d65-7901-83a6-18ec6ca8297e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "having-adhd",
  title: "Having ADHD",
  definition: "the ADHD half of how I am built, what it costs and what it gives",
  parentSlugs: ["alan"],
  relatedSlugs: ["how-my-attention-works", "how-i-get-anything-done"],
  settled:
    "It is how I am built rather than something wrong with me, and I would not take a pill against it.\n\nThe heart of it is executive function, and I get a double dose because autism brings its own.\n\nIts social face is milder than autism's, and it has real treatments where autism has almost none.\n\nMilder socially is not milder. Left unmanaged it is sharply disabling for the one who has it.",
  unsettled:
    "Which levers I actually use, medication and systems and controls on my surroundings, has never been set down.\n\nWhat it gives me that I would not trade, and whether those gifts separate cleanly from autism's, is unanswered.\n\nWhich part of it has cost me most, whether executive function or attention or time or working memory, is unranked.\n\nMedication roughly doubles my resilience, and which of reserve, recovery speed or cost multiplier it moves is unsplit. Coming off it has no steps yet.",
} as const satisfies AllAboutAlanTopic
