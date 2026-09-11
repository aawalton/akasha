import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const cornFarmer = {
  id: "01a0657e-134f-7fae-8387-e43f0a2299a3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "corn-farmer",
  title: "Corn Farmer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
