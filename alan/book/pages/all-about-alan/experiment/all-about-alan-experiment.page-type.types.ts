import type { LineSet } from "akasha/alan/book/pages/all-about-alan/experiment/properties/line-set.file-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type AllAboutAlanExperiment = Page & {
  title: Title
  definition: Definition
  lineSet?: LineSet
}
