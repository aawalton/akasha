import type { RelationshipTopicParent } from "akasha/alan/relating/relationship-topics/properties/relationship-topic-parent.relation-property.types.ts"
import type { RelationshipTopicPeople } from "akasha/alan/relating/relationship-topics/properties/relationship-topic-people.relation-property.types.ts"
import type { RelationshipTopicSensitivity } from "akasha/alan/relating/relationship-topics/properties/relationship-topic-sensitivity.select-property.types.ts"
import type { RelationshipTopicStatus } from "akasha/alan/relating/relationship-topics/properties/relationship-topic-status.select-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type RelationshipTopic = Page & {
  title: Title
  relationshipTopicParent?: RelationshipTopicParent
  relationshipTopicPeople?: RelationshipTopicPeople
  relationshipTopicSensitivity: RelationshipTopicSensitivity
  relationshipTopicStatus: RelationshipTopicStatus
}
