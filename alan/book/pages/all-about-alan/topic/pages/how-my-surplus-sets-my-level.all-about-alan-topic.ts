import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMySurplusSetsMyLevel = {
  id: "01a0c5e9-f090-7009-aae1-e0e33c361ff0",
  type: "page-type/all-about-alan-topic",
  slug: "how-my-surplus-sets-my-level",
  title: "How My Surplus Sets My Level",
  definition:
    "the steps my safety level drops by as my capacity surplus falls, and the loop that makes",
  parents: ["all-about-alan-topic/safety-level"],
  related: [
    "all-about-alan-topic/the-surplus-i-try-to-stay-above",
    "all-about-alan-topic/the-multiplier-table",
    "all-about-alan-topic/the-budget-i-run-my-days-on",
  ],
  settled:
    "My current safety level depends on my current stress-capacity surplus.\n\nThe optimal surplus is twelve hours. Below twelve I lose half a safety step. Below eight I lose another half step. The pattern continues on down.\n\nThat makes a loop that can run away. A cost drops my surplus, the lower surplus drops my safety level, the lower level raises the multiplier on everything I do, and the higher multiplier makes the next cost bigger. Once the multiplier is high the decline accelerates.",
} as const satisfies AllAboutAlanTopic
