import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipDepositDate } from "./properties/relationship-deposit-date.calendar-date-property.types.ts"
import type { RelationshipDepositPersona } from "./properties/relationship-deposit-persona.relation-property.types.ts"
import type { RelationshipDepositRelationship } from "./properties/relationship-deposit-relationship.relation-property.types.ts"
import type { RelationshipDepositSize } from "./properties/relationship-deposit-size.select-property.types.ts"
import type { RelationshipDepositValue } from "./properties/relationship-deposit-value.relation-property.types.ts"

export type RelationshipDeposit = Page & {
  title: Title
  relationshipDepositDate: RelationshipDepositDate
  relationshipDepositPersona: RelationshipDepositPersona
  relationshipDepositRelationship: RelationshipDepositRelationship
  relationshipDepositSize: RelationshipDepositSize
  relationshipDepositValue: RelationshipDepositValue
}
