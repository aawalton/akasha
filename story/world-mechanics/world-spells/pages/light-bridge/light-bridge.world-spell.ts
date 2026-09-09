import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightBridge = {
  id: "01a06572-95ce-78a3-a1f3-1d62bf9d2350",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-bridge",
  title: "Light Bridge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
