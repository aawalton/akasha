import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"
import type { Aliases } from "akasha/story/world-mechanic/properties/aliases.text-property.types.ts"
import type { EvolvesFromSlugs } from "akasha/story/world-mechanic/properties/evolves-from-slugs.text-property.types.ts"
import type { EvolvesToSlugs } from "akasha/story/world-mechanic/properties/evolves-to-slugs.text-property.types.ts"
import type { References } from "akasha/story/world-mechanic/properties/references.page-property-entry.types.ts"

export type WorldMechanic = Page & {
  title: Title
  world?: World
  aliases?: Aliases
  evolvesFromSlugs?: EvolvesFromSlugs
  evolvesToSlugs?: EvolvesToSlugs
  references?: References
}
