import type { Definition } from "../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Simulation } from "./properties/simulation.code-file-property.ts"

export type AllAboutAlanModel = Page & {
  title: Title
  definition: Definition
  simulation?: Simulation
}
