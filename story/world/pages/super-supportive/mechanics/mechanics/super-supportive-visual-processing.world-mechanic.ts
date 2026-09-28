import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveVisualProcessing = {
  id: "01a0e9f7-dffb-7254-8ea8-0af794ec2710",
  type: "page-type/world-mechanic",
  slug: "super-supportive-visual-processing",
  title: "Visual Processing",
  world: "world/super-supportive",
  description:
    "A stat for how well the eyes and brain take in what is seen, listed under Processing.",
} as const satisfies WorldMechanic
