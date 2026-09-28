import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRabbitWelcome = {
  id: "01a0e9fb-2b66-7182-a47f-f71ebdc6454d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-rabbit-welcome",
  title: "Rabbit Welcome",
  world: "world/super-supportive",
  description: "An annual Anesidoran welcome party for new Rabbits.",
} as const satisfies WorldMechanic
