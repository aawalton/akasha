import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const driverInertCargoBox = {
  id: "01a06575-9806-748f-829e-46ff84e1c831",
  type: "page-type/world-skill",
  slug: "driver-inert-cargo-box",
  title: "Driver – Inert Cargo (Box)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
