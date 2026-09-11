import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const blademasterOfTheCrimsonField = {
  id: "01a0657e-01bd-7470-92aa-7fbe18fa741a",
  type: "world-class",
  slug: "blademaster-of-the-crimson-field",
  title: "Blademaster of the Crimson Field",
  world: "the-wandering-inn",
  evolvesToSlugs: ["blademaster-the-path-of-legends"],
} as const satisfies WorldClass
