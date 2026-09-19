import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const commandSergeant = {
  id: "01a0657e-134c-764b-bec4-a2431d41049e",
  type: "page-type/world-class",
  slug: "command-sergeant",
  title: "Command Sergeant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
