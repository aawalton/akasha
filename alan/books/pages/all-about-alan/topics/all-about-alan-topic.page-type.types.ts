import type { TopicParents } from "akasha/alan/books/pages/all-about-alan/topics/properties/topic-parents.relation-property.types.ts"
import type { TopicRelated } from "akasha/alan/books/pages/all-about-alan/topics/properties/topic-related.relation-property.types.ts"
import type { TopicSettled } from "akasha/alan/books/pages/all-about-alan/topics/properties/topic-settled.text-property.types.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type AllAboutAlanTopic = Page & {
  title: Title
  definition: Definition
  parents?: TopicParents
  related?: TopicRelated
  settled?: TopicSettled
}
