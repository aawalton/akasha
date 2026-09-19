import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courtWizard = {
  id: "01a0657e-134f-7085-84a4-f22a3245c255",
  type: "page-type/world-class",
  slug: "court-wizard",
  title: "Court Wizard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
