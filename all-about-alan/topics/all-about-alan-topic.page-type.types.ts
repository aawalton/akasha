import type { Definition } from "../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { TopicParents } from "./properties/topic-parents.relation-property.ts"
import type { TopicRelated } from "./properties/topic-related.relation-property.ts"
import type { TopicSettled } from "./properties/topic-settled.text-property.ts"

export type AllAboutAlanTopic = Page & {
  title: Title
  definition: Definition
  parents?: TopicParents
  related?: TopicRelated
  settled?: TopicSettled
}
