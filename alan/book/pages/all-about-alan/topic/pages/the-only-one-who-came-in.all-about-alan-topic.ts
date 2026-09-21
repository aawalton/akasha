import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theOnlyOneWhoCameIn = {
  id: "01a0c5a3-1eeb-7a56-b730-6d09bd8e4ff2",
  type: "page-type/all-about-alan-topic",
  slug: "the-only-one-who-came-in",
  title: "The Only One Who Came In",
  definition: "the night in Nauvoo when I was the only one who answered the summons",
  parents: ["all-about-alan-topic/keeping-my-word"],
  related: ["all-about-alan-topic/the-first-person-i-loved"],
  settled:
    "The same night I broke up with Kerry, a rowdy after-curfew party got the faculty cracking down, and I was swept up in it.\n\nEveryone up that night was asked to come in for consequences. I was the only one who came, and the only one who suffered: community service in the cafeteria for weeks.\n\nMy grandfather directed the program, so they could not afford to show me any favouritism.\n\nThe service repaired my relationships inside the program. It never repaired the one with Kerry.",
} as const satisfies AllAboutAlanTopic
