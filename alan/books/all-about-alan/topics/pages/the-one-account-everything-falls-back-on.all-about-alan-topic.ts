import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theOneAccountEverythingFallsBackOn = {
  id: "01a06559-9d65-78b0-bf36-e2813b9c69cd",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-one-account-everything-falls-back-on",
  title: "The One Account Everything Falls Back On",
  definition: "the address every other account uses to prove I am me",
  parentSlugs: ["getting-out-from-under-a-dependency"],
  relatedSlugs: ["how-i-grade-an-organisation"],
  settled:
    "One address is where every other account goes to prove I am me. Whoever holds it holds all of them.\n\nMine is Gmail, which makes it the most depended-on and least trusted place in the whole graph.\n\nIt does two jobs that come apart: signing me in everywhere, and being the fallback.\n\nThe signing in I have accepted. There is no real alternative, so I stopped spending anything resenting it.\n\nThe fallback I want to move, and whatever replaces it has to be more dependable than Google, not adequate.",
  unsettled:
    "I have a detailed model of who I trust and nothing at all on what I need from reliability. No floor, no target, nothing saying an anchor must be at least as dependable as what it replaces.\n\nSelf-hosting is the named candidate and has no plan: no stack chosen, no map of which accounts point at the address, no order to move them in.",
} as const satisfies AllAboutAlanTopic
