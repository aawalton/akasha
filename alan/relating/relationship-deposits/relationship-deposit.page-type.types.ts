import type { RelationshipDepositDate } from "akasha/alan/relating/relationship-deposits/properties/relationship-deposit-date.calendar-date-property.types.ts"
import type { RelationshipDepositPersona } from "akasha/alan/relating/relationship-deposits/properties/relationship-deposit-persona.relation-property.types.ts"
import type { RelationshipDepositRelationship } from "akasha/alan/relating/relationship-deposits/properties/relationship-deposit-relationship.relation-property.types.ts"
import type { RelationshipDepositSize } from "akasha/alan/relating/relationship-deposits/properties/relationship-deposit-size.select-property.types.ts"
import type { RelationshipDepositValue } from "akasha/alan/relating/relationship-deposits/properties/relationship-deposit-value.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type RelationshipDeposit = Page & {
  title: Title
  relationshipDepositDate: RelationshipDepositDate
  relationshipDepositPersona: RelationshipDepositPersona
  relationshipDepositRelationship: RelationshipDepositRelationship
  relationshipDepositSize: RelationshipDepositSize
  relationshipDepositValue: RelationshipDepositValue
}
