import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFourStepsOffAnthropic = {
  id: "01a0c5f6-62d4-76c0-8dab-2b2c0b8da198",
  type: "page-type/all-about-alan-topic",
  slug: "the-four-steps-off-anthropic",
  title: "The Four Steps Off Anthropic",
  definition: "the sequence the migration runs in, each step blocking on the one before",
  parents: ["all-about-alan-topic/getting-off-anthropic"],
  settled:
    "One. Wait for Apple to make a Mac Studio with at least 512GB of memory available again. Memory shortages have taken that configuration off sale, and I cannot hurry Apple or the supply chain. While I wait I keep paying and I prepare.\n\nTwo. Buy it, out of the subscription budget. No extra outlay.\n\nThree. Replace the subscriptions with local open-weights inference and test it against my real workloads: Claude Code, the agent runtime that drives my development, and the daily uses across cooking, medicine, money, the car, the house, the garden, textiles and negotiation. Testing is the gate.\n\nFour. Retire all four subscriptions together, once step three is clean. Retiring them one at a time buys nothing, because the test is the gate rather than any one subscription.\n\nStep one is the standing state until the machine is back on sale. Two to four run immediately and in order once it is.",
} as const satisfies AllAboutAlanTopic
