import type { RelationshipDepositDate } from "akasha/alan/relationships/relationship-deposit/properties/relationship-deposit-date.calendar-date-property.types.ts"
import type { RelationshipDepositPersona } from "akasha/alan/relationships/relationship-deposit/properties/relationship-deposit-persona.relation-property.types.ts"
import type { RelationshipDepositRelationship } from "akasha/alan/relationships/relationship-deposit/properties/relationship-deposit-relationship.relation-property.types.ts"
import type { RelationshipDepositSize } from "akasha/alan/relationships/relationship-deposit/properties/relationship-deposit-size.select-property.types.ts"
import type { RelationshipDepositValue } from "akasha/alan/relationships/relationship-deposit/properties/relationship-deposit-value.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type RelationshipDeposit = Page & {
  title: Title
  relationshipDepositDate: RelationshipDepositDate
  relationshipDepositPersona: RelationshipDepositPersona
  relationshipDepositRelationship: RelationshipDepositRelationship
  relationshipDepositSize: RelationshipDepositSize
  relationshipDepositValue: RelationshipDepositValue
}
