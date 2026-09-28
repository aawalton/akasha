import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTriangleOfAbsoluteSecrecy = {
  id: "01a0e9f2-9a52-75a9-98e6-fde65cd627f3",
  type: "page-type/world-mechanic",
  slug: "super-supportive-triangle-of-absolute-secrecy",
  title: "Triangle of Absolute Secrecy",
  world: "world/super-supportive",
  aliases: ["Triangle of Secrecy"],
  description:
    "A contract-tattoo clause never to intentionally reveal the other party's information to anyone.",
} as const satisfies WorldMechanic
