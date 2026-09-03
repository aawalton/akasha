import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatIInventedAndWhatIRead = {
  id: "01a047c8-d168-7d39-8148-fb06ab90c551",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-i-invented-and-what-i-read",
  title: "What I Invented And What I Read",
  definition: "the line between what I took from the literature and what I worked out myself",
  parentSlugs: ["why-i-keep-my-data-in-files"],
  settled:
    "I did not invent the idea that agents do better with files. I saw research papers on that.\n\nI have not seen anyone take it to its conclusion and replace Postgres with agent-readable files. Even if I was not the first to invent that solution, I invented it independently.",
  unsettled: "Which research papers, and what they actually claimed, is not recorded.",
} as const satisfies AllAboutAlanTopic
