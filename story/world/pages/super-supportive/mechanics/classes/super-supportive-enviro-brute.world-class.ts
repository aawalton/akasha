import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveEnviroBrute = {
  id: "01a0e9f5-fdea-7ac4-ab62-9680429dbabd",
  type: "page-type/world-class",
  slug: "super-supportive-enviro-brute",
  title: "Enviro Brute",
  world: "world/super-supportive",
  aliases: ["Enviro"],
  description: "The group of environmental Brute subclasses, such as Aqua Brute and Glacial Brute.",
} as const satisfies WorldClass
