import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const myRulesAboutOtherWomen = {
  id: "01a06559-9d65-70e0-ac7b-9cf16c62ab14",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "my-rules-about-other-women",
  title: "My Rules About Other Women",
  definition: "pre-decided lines standing in for a judgment I cannot make in the moment",
  parents: ["who-is-safe-to-be-around"],
  related: ["living-with-jen", "rules-instead-of-a-brake"],
  settled:
    "Most married men picture the scene and read the feeling. I cannot, and the live cues do not reach me.\n\nSo I hold bright lines instead: distance one to one with a woman, and no physical contact.\n\nOutside my immediate family I default to no contact at all, bar a handshake or a family hug.\n\nI push closeness toward the intellectual rather than the personal, and I never initiate with a woman.\n\nBeing visible to Jen is my monitor, standing in for the check I cannot run inside my own head.",
} as const satisfies AllAboutAlanTopic
