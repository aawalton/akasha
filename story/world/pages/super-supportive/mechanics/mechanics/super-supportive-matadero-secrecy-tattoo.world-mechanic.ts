import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveMataderoSecrecyTattoo = {
  id: "01a0e9fb-2b66-767c-80b1-294e336be60e",
  type: "page-type/world-mechanic",
  slug: "super-supportive-matadero-secrecy-tattoo",
  title: "Matadero secrecy tattoo",
  world: "world/super-supportive",
  description:
    "The standard contract for almost everyone who sees inside Matadero: don't tell people what you've seen there.",
} as const satisfies WorldMechanic
