import type { TopicParents } from "akasha/alan/book/pages/all-about-alan/topic/properties/topic-parents.multi-relation-property.types.ts"
import type { TopicRelated } from "akasha/alan/book/pages/all-about-alan/topic/properties/topic-related.multi-relation-property.types.ts"
import type { TopicSettled } from "akasha/alan/book/pages/all-about-alan/topic/properties/topic-settled.text-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type AllAboutAlanTopic = Page & {
  title: Title
  definition: Definition
  parents?: TopicParents
  related?: TopicRelated
  settled?: TopicSettled
}
