import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { Aliases } from "./properties/aliases.text-property.ts"
import type { EvolvesFromSlugs } from "./properties/evolves-from-slugs.text-property.ts"
import type { EvolvesToSlugs } from "./properties/evolves-to-slugs.text-property.ts"
import type { References } from "./properties/references.page-property-entry.ts"

export type WorldMechanic = Page & {
  title: Title
  world?: World
  aliases?: Aliases
  evolvesFromSlugs?: EvolvesFromSlugs
  evolvesToSlugs?: EvolvesToSlugs
  references?: References
}
