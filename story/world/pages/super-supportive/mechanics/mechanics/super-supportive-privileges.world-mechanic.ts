import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePrivileges = {
  id: "01a0e9f2-9a52-78e4-9a5d-48205977c99d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-privileges",
  title: "Privileges",
  world: "world/super-supportive",
  description: "A System interface section listing the special rights and marks an Avowed has.",
} as const satisfies WorldMechanic
