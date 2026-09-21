import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theOneAccountEverythingFallsBackOn = {
  id: "01a06559-9d65-78b0-bf36-e2813b9c69cd",
  type: "page-type/all-about-alan-topic",
  slug: "the-one-account-everything-falls-back-on",
  title: "The One Account Everything Falls Back On",
  definition: "the address every other account uses to prove I am me",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: ["all-about-alan-topic/how-i-grade-an-organisation"],
  settled:
    "One address is where every other account goes to prove I am me. Whoever holds it holds all of them.\n\nMine is Gmail, which makes it the most depended-on and least trusted place in the whole graph.\n\nLose it and everything downstream becomes unrecoverable. The dependency runs toward it rather than away, and that direction is what makes it load-bearing.\n\nIt does two jobs that come apart: signing me in everywhere, and being the fallback.\n\nThe signing in I have accepted. There is no real alternative, so I stopped spending anything resenting it.\n\nThe fallback I want to move, and to self-host if I can. Whatever replaces it has to be more dependable than Google rather than adequate, and that bar is one of the two axes.\n\nThe other is the hours: a map of which accounts fall back to it, an ordering that never leaves one recoverable only through a half-moved path, and the build itself.\n\nIt is one of a small shelf of not-yet projects.",
} as const satisfies AllAboutAlanTopic
