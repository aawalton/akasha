import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveContactPriority = {
  id: "01a0e9f2-9a51-74c2-80aa-07a48a156342",
  type: "page-type/world-mechanic",
  slug: "super-supportive-contact-priority",
  title: "Contact priority",
  world: "world/super-supportive",
  aliases: ["priority contacts", "contact permission"],
  description: "A list setting who can call or text an Avowed and in what order.",
} as const satisfies WorldMechanic
