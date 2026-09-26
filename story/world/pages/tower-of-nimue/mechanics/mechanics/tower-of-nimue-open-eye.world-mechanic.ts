import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueOpenEye = {
  id: "01a0deeb-597e-7958-9ce4-690f85019c04",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-open-eye",
  title: "Open Eye",
  world: "world/tower-of-nimue",
  description:
    "Open Eye is the Seer's baseline essence, a human shard crystallized from who Nimue was, and it fills her first slot. Its passive reveals enemy weak points, for an 18% critical chance and 50% more critical damage, and adds one essence option to every Harvest. Its active, Read, exposes a target's resistances so the target takes 20% more damage for 2 actions, with a 2-action cooldown.",
} as const satisfies WorldMechanic
