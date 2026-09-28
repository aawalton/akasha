import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSystemCall = {
  id: "01a0e9f2-9a52-71a7-8b83-c7f32aaa6cb0",
  type: "page-type/world-mechanic",
  slug: "super-supportive-system-call",
  title: "System call",
  world: "world/super-supportive",
  aliases: ["video call", "voice call"],
  description:
    "A call through the System interface by voice, video or text, even across dimensions.",
} as const satisfies WorldMechanic
