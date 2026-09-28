import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAuthorityGreeting = {
  id: "01a0e9f8-aa22-7a1d-ad85-83a5f1d53065",
  type: "page-type/world-mechanic",
  slug: "super-supportive-authority-greeting",
  title: "Authority greeting",
  world: "world/super-supportive",
  aliases: ["the hopeful one", "pat-pat", "pounce"],
  description:
    "Wizards reaching toward each other's presence with authority, answered by a tap or by opening one's boundary.",
} as const satisfies WorldMechanic
