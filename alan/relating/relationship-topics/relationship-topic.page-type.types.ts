import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipTopicParent } from "./properties/relationship-topic-parent.relation-property.types.ts"
import type { RelationshipTopicPeople } from "./properties/relationship-topic-people.relation-property.types.ts"
import type { RelationshipTopicSensitivity } from "./properties/relationship-topic-sensitivity.select-property.types.ts"
import type { RelationshipTopicStatus } from "./properties/relationship-topic-status.select-property.types.ts"

export type RelationshipTopic = Page & {
  title: Title
  relationshipTopicParent?: RelationshipTopicParent
  relationshipTopicPeople?: RelationshipTopicPeople
  relationshipTopicSensitivity: RelationshipTopicSensitivity
  relationshipTopicStatus: RelationshipTopicStatus
}
