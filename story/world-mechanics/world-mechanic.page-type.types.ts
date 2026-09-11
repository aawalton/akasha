import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { Aliases } from "akasha/story/world-mechanics/properties/aliases.text-property.types.ts"
import type { EvolvesFromSlugs } from "akasha/story/world-mechanics/properties/evolves-from-slugs.text-property.types.ts"
import type { EvolvesToSlugs } from "akasha/story/world-mechanics/properties/evolves-to-slugs.text-property.types.ts"
import type { References } from "akasha/story/world-mechanics/properties/references.page-property-entry.types.ts"

export type WorldMechanic = Page & {
  title: Title
  world?: World
  aliases?: Aliases
  evolvesFromSlugs?: EvolvesFromSlugs
  evolvesToSlugs?: EvolvesToSlugs
  references?: References
}
