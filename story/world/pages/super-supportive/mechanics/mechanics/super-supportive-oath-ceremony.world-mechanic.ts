import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveOathCeremony = {
  id: "01a0e9f9-7733-76b9-b056-41c09f75ea12",
  type: "page-type/world-mechanic",
  slug: "super-supportive-oath-ceremony",
  title: "Oath ceremony",
  world: "world/super-supportive",
  description:
    "The ceremony that makes a candidate Declared, where knights prompt shared memories and hear who the newcomer is.",
} as const satisfies WorldMechanic
