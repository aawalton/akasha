import type { WorldSkill } from "../../world-skill.page-type.ts"

export const preparedSignal = {
  id: "01a0657d-0296-7fa9-a479-0ef9357d4606",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "prepared-signal",
  title: "Prepared Signal",
  world: "the-wandering-inn",
  evolvesToSlugs: ["plotter-s-network"],
  references: "jsonl",
} as const satisfies WorldSkill
