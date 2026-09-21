import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatKeepsMeInTheBath = {
  id: "01a0c5e7-7ab5-7729-8339-df8ef9606763",
  type: "page-type/all-about-alan-topic",
  slug: "what-keeps-me-in-the-bath",
  title: "What Keeps Me In The Bath",
  definition: "what the bath spends, what I pair it with to last longer, and why not exercise",
  parents: ["all-about-alan-topic/the-hot-bath"],
  related: ["all-about-alan-topic/mana-bar", "all-about-alan-topic/what-interrupts-my-breathing"],
  settled:
    "On the stamina scale the bath sits between rest and exercise. My heart rate goes up, and the sweating and circulation spend some stamina. But mana, not stamina, is what usually limits how long I can stay in.\n\nSo I pair it with things that restore mana, in this order: reading first, since it gives the most back, snacking second, Instagram as the last resort. The order is the order of how much I want each.\n\nThe breathing runs in the tub as it runs everywhere. Snacking pauses it, the same way talking does, because chewing and swallowing take the airway.\n\nSweaty exercise produces the same shift by the same mechanism. I use the bath instead because it spends mana without the stamina exercise demands, and because low health drags mana and stamina down with it. The moments that most need the recovery are the moments least able to afford the exercise version.",
} as const satisfies AllAboutAlanTopic
