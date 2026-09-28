import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiMessageSparrow = {
  id: "01a0ea42-eb9c-77b3-86ca-ad23c7c3f9f9",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-message-sparrow",
  title: "Message Sparrow",
  world: "world/god-of-trash",
  description: "An ink sparrow that flies a spoken message to its reader, then turns back to ink.",
  manaCost: 6,
} as const satisfies WorldSkill
