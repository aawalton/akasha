import type { Simulation } from "akasha/alan/books/pages/all-about-alan/models/properties/simulation.code-file-property.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type AllAboutAlanModel = Page & {
  title: Title
  definition: Definition
  simulation?: Simulation
}
