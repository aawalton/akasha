import type { Definition } from "../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { LineSet } from "./properties/line-set.file-property.ts"

export type AllAboutAlanExperiment = Page & {
  title: Title
  definition: Definition
  lineSet?: LineSet
}
