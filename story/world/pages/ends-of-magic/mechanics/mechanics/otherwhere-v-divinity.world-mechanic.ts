import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVDivinity = {
  id: "01a0e9f5-6823-7501-9e2c-53a3f7d54e97",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-divinity",
  title: "Divinity",
  world: "world/ends-of-magic",
  aliases: ["divine magic", "divine power", "Faith"],
  description: "Holy power drawn from faith.",
} as const satisfies WorldMechanic
