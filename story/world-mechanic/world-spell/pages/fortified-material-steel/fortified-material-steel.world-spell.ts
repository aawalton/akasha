import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const fortifiedMaterialSteel = {
  id: "01a06572-95c5-7c15-a96a-2e4b1407884e",
  type: "world-spell",
  slug: "fortified-material-steel",
  title: "Fortified Material: Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
