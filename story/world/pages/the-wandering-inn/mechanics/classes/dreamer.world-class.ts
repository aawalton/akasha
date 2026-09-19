import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dreamer = {
  id: "01a0657e-1357-7398-a392-e00ef9cdfc25",
  type: "page-type/world-class",
  slug: "dreamer",
  title: "Dreamer",
  world: "world/the-wandering-inn",
  aliases: ["dreamers"],
  references: "jsonl",
} as const satisfies WorldClass
