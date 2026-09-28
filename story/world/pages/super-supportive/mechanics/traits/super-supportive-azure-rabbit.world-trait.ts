import type { WorldTrait } from "akasha/story/world/mechanics/traits/world-trait.page-type.types.ts"

export const superSupportiveAzureRabbit = {
  id: "01a0e9f0-79f4-7dfe-8853-e2e6b00240db",
  type: "page-type/world-trait",
  slug: "super-supportive-azure-rabbit",
  title: "Azure Rabbit",
  world: "world/super-supportive",
  story: "story-read/super-supportive",
  aliases: ["movement trait"],
  description:
    "A Rabbit trait that coats its user in magic, turning part of gravity into force when they kick off the ground.",
} as const satisfies WorldTrait
