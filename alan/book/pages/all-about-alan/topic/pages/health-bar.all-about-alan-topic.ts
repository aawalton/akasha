import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const healthBar = {
  id: "01a06559-9d65-7ad1-b413-f3d982ce26eb",
  type: "page-type/all-about-alan-topic",
  slug: "health-bar",
  title: "Health Bar",
  definition: "the stress my body can carry",
  parents: ["all-about-alan-topic/resource-bars"],
  related: ["all-about-alan-topic/stress-capacity"],
  settled:
    "Health is my stress capacity bar, the buffer I can keep drawing against.\n\nIt is roughly my stress level's cost added up over time, adjusted for sleep, rest and recovery.\n\nTwo different things have been called health: the stress I am carrying right now, and the capacity underneath it. They run at different speeds and answer to different inputs, and I have not finished pulling them apart.\n\nI read the capacity as a percentage of nervous-system health. One percent is the burnout floor, where ordinary daily living fails outright. In April 2026 it sat at about five.\n\nIt is a metered budget rather than a gate, so it needs a running balance and not just a level. That is why a real number was worth the decade it took to build here, and it is the only real number I have on any of my resources.\n",
} as const satisfies AllAboutAlanTopic
