import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { RelationshipAccountUserId } from "./properties/relationship-account-user-id.text-property.ts"
import type { RelationshipAliases } from "./properties/relationship-aliases.text-property.ts"
import type { RelationshipCommitment } from "./properties/relationship-commitment.number-property.ts"
import type { RelationshipCompany } from "./properties/relationship-company.text-property.ts"
import type { RelationshipConnection } from "./properties/relationship-connection.number-property.ts"
import type { RelationshipCurrentCircle } from "./properties/relationship-current-circle.select-property.ts"
import type { RelationshipEmail } from "./properties/relationship-email.email-address-property.ts"
import type { RelationshipImpact } from "./properties/relationship-impact.number-property.ts"
import type { RelationshipInterest } from "./properties/relationship-interest.number-property.ts"
import type { RelationshipLinkedinUrl } from "./properties/relationship-linkedin-url.url-property.ts"
import type { RelationshipMetAt } from "./properties/relationship-met-at.text-property.ts"
import type { RelationshipNotes } from "./properties/relationship-notes.file-property.ts"
import type { RelationshipPhone } from "./properties/relationship-phone.phone-number-property.ts"
import type { RelationshipRole } from "./properties/relationship-role.text-property.ts"
import type { RelationshipSmsAllowed } from "./properties/relationship-sms-allowed.boolean-property.ts"
import type { RelationshipSmsHandlerTarget } from "./properties/relationship-sms-handler-target.relation-property.ts"
import type { RelationshipTopics } from "./properties/relationship-topics.relation-property.ts"

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
