import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const readingPeopleByHand = {
  id: "01a0c5fa-4090-7f63-bdc6-054f4f8cf13d",
  type: "page-type/all-about-alan-topic",
  slug: "reading-people-by-hand",
  title: "Reading People By Hand",
  definition:
    "expressions, tone and other minds, read through explicit theory where the implicit channel is thin",
  parents: ["all-about-alan-topic/being-autistic"],
  related: [
    "all-about-alan-topic/building-a-people-skill-by-hand",
    "all-about-alan-topic/how-i-come-across",
  ],
  settled:
    "Reading expressions and tone is reduced, in two layers. The implicit social learning most people compress out of watching is thin, and aphantasia takes the second: I cannot remember or imagine my own emotions as reference points.\n\nTheory of mind is reduced on raw input too. I compensate with explicit theories of other minds. At fourteen I spent a year studying the rules of social interaction, and once integrated they fire on retrieval rather than effortful search. The direct cost is executive function. The indirect cost is the trauma that years of bad outcomes encoded.\n\nI can mask at a very high level for a short interaction with someone new, and it degrades over time. In college I had over a hundred first dates and three second dates.\n\nI do not match the blunt trope. Sensitivity forced me to learn early, and what I learned was more charm than tact, since charm runs on confidence and tact needs hedging. As a kid I had a reputation as a peacemaker, even for adults.",
} as const satisfies AllAboutAlanTopic
