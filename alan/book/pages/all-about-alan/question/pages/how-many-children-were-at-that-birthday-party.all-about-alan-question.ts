import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howManyChildrenWereAtThatBirthdayParty = {
  id: "01a0c640-35fc-7c63-80d4-e85393882ae5",
  type: "page-type/all-about-alan-question",
  slug: "how-many-children-were-at-that-birthday-party",
  topic: "all-about-alan-topic/the-friends-i-lost-track-of",
  ask: "I have told it both ways: thirty children invited to a birthday party, and twenty friends wanted at my tenth birthday. Which is the number, and is it one party or two?",
} as const satisfies AllAboutAlanQuestion
