import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinLordSolsticeRagsOfChange = {
  id: "01a0657e-01e2-71b2-9852-9cad33a50557",
  type: "page-type/world-class",
  slug: "goblin-lord-solstice-rags-of-change",
  title: "Goblin Lord (Solstice) – “Rags of Change”",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["great-chieftain"],
  references: "jsonl",
} as const satisfies WorldClass
