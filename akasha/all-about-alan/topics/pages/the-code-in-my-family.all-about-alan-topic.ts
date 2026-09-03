import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theCodeInMyFamily = {
  id: "01a04615-3062-77cf-bc5a-0784815ed598",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-code-in-my-family",
  title: "The Code In My Family",
  definition: "the three generations of programmers I come from",
  parentSlugs: ["alan"],
  relatedSlugs: ["the-years-with-my-parents", "being-an-inventor-not-a-coder"],
  settled:
    'I am third generation in code.\n\nMy grandfather was a programmer before "computer science" was coined as a term. He started with vacuum tubes in the air force.\n\nHe introduced Daniel Ritchie to the team working on B.\n\nMy mother was a programmer my entire childhood.\n\nAbout eighty per cent of my extended family on that side ended up in computer science.',
  unsettled:
    'I said "Daniel Ritchie" for the person my grandfather introduced to the B team. Abby\'s note: the name carried on the public record for B and C is Dennis Ritchie. Which I meant is mine to settle.\n\nWhat my grandfather worked on, beyond the vacuum tubes and the B team, is unwritten.\n\nWhat it did to me to have a programmer for a mother through my whole childhood is unprobed.',
} as const satisfies AllAboutAlanTopic
