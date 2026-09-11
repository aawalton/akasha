import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const dublinConsensus = {
  id: "019dbb6e-4591-7024-8ad4-f8df1122b008",
  type: "ctw-achievement",
  slug: "dublin-consensus",
  title: "Dublin Consensus",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 250000,
  description:
    "On 30 May 2008, 107 nations adopted the Convention on Cluster Munitions in Dublin — banning weapons that leave fields of unexploded submunitions. Consensus required sustained pressure from citizens and organisations alike.",
} as const satisfies CtwAchievement
