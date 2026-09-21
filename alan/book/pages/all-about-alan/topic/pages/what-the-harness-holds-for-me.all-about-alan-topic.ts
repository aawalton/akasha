import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTheHarnessHoldsForMe = {
  id: "01a0c5f3-1f81-7780-9fcc-c7e20967f438",
  type: "page-type/all-about-alan-topic",
  slug: "what-the-harness-holds-for-me",
  title: "What The Harness Holds For Me",
  definition:
    "the four things my head does not carry that the harness carries instead, and the streams",
  parents: ["all-about-alan-topic/the-scaffolding-i-built"],
  related: [
    "all-about-alan-topic/small-bites-of-many-things",
    "all-about-alan-topic/why-a-sequence-never-goes-automatic",
  ],
  settled:
    "Four things. State, in workflows, notes, projects, lists and calendars, because what other people carry implicitly I have to carry explicitly. Valuation, in principles, rules and ranked priorities, because what others feel as wanting I handle by scoring against the rules. Sequences, in written step lists and checklists, because a sequence of mine never goes automatic and putting it outside me is the only answer. And what I should be doing at all, because I cannot feel that out.\n\nThe task half is a set of streams in software. Tasks. Temper Tasks, for the game. Calendar. Email. Text messages. And the collections I rotate through: music, books, shows, courses, and my progress in the game.\n\nThose are most of the ones that have mattered. Every one is something pushed out of my head and into a system, and the system is where the state lives.",
} as const satisfies AllAboutAlanTopic
