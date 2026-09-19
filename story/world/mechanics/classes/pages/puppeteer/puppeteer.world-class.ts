import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const puppeteer = {
  id: "01a06586-0a19-73a4-889c-5c9ae40accdb",
  type: "page-type/world-class",
  slug: "puppeteer",
  title: "Puppeteer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
