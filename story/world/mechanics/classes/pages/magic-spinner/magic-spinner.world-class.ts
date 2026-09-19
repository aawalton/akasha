import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicSpinner = {
  id: "01a0657e-139b-7a4f-add5-db093dcfcf73",
  type: "page-type/world-class",
  slug: "magic-spinner",
  title: "Magic Spinner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
