import type { RelationshipAccountUserId } from "akasha/alan/relationships/relationship/properties/relationship-account-user-id.text-property.types.ts"
import type { RelationshipAliases } from "akasha/alan/relationships/relationship/properties/relationship-aliases.text-property.types.ts"
import type { RelationshipCommitment } from "akasha/alan/relationships/relationship/properties/relationship-commitment.number-property.types.ts"
import type { RelationshipCompany } from "akasha/alan/relationships/relationship/properties/relationship-company.text-property.types.ts"
import type { RelationshipConnection } from "akasha/alan/relationships/relationship/properties/relationship-connection.number-property.types.ts"
import type { RelationshipCurrentCircle } from "akasha/alan/relationships/relationship/properties/relationship-current-circle.select-property.types.ts"
import type { RelationshipEmail } from "akasha/alan/relationships/relationship/properties/relationship-email.email-address-property.types.ts"
import type { RelationshipImpact } from "akasha/alan/relationships/relationship/properties/relationship-impact.number-property.types.ts"
import type { RelationshipInterest } from "akasha/alan/relationships/relationship/properties/relationship-interest.number-property.types.ts"
import type { RelationshipLinkedinUrl } from "akasha/alan/relationships/relationship/properties/relationship-linkedin-url.url-property.types.ts"
import type { RelationshipMetAt } from "akasha/alan/relationships/relationship/properties/relationship-met-at.text-property.types.ts"
import type { RelationshipNotes } from "akasha/alan/relationships/relationship/properties/relationship-notes.file-property.types.ts"
import type { RelationshipPhone } from "akasha/alan/relationships/relationship/properties/relationship-phone.phone-number-property.types.ts"
import type { RelationshipRole } from "akasha/alan/relationships/relationship/properties/relationship-role.text-property.types.ts"
import type { RelationshipSmsAllowed } from "akasha/alan/relationships/relationship/properties/relationship-sms-allowed.boolean-property.types.ts"
import type { RelationshipSmsHandlerTarget } from "akasha/alan/relationships/relationship/properties/relationship-sms-handler-target.relation-property.types.ts"
import type { RelationshipTopics } from "akasha/alan/relationships/relationship/properties/relationship-topics.multi-relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Relationship = Page & {
  title: Title
  relationshipAccountUserId?: RelationshipAccountUserId
  relationshipAliases?: RelationshipAliases
  relationshipCommitment?: RelationshipCommitment
  relationshipCompany?: RelationshipCompany
  relationshipConnection?: RelationshipConnection
  relationshipCurrentCircle?: RelationshipCurrentCircle
  email?: RelationshipEmail
  relationshipImpact?: RelationshipImpact
  relationshipInterest?: RelationshipInterest
  relationshipLinkedinUrl?: RelationshipLinkedinUrl
  relationshipMetAt?: RelationshipMetAt
  relationshipPhone?: RelationshipPhone
  relationshipRole?: RelationshipRole
  relationshipSmsAllowed?: RelationshipSmsAllowed
  relationshipSmsHandlerTarget?: RelationshipSmsHandlerTarget
  relationshipTopics?: RelationshipTopics
  relationshipNotes?: RelationshipNotes
}
