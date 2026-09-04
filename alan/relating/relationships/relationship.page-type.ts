import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"
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
import type { RelationshipTopicSlugs } from "./properties/relationship-topic-slugs.relation-property.ts"

export type Relationship = Page & {
  title: Title
  relationshipAccountUserId?: RelationshipAccountUserId
  relationshipAliases?: readonly RelationshipAliases[]
  relationshipCommitment?: RelationshipCommitment
  relationshipCompany?: RelationshipCompany
  relationshipConnection?: RelationshipConnection
  relationshipCurrentCircle?: RelationshipCurrentCircle
  relationshipEmail?: RelationshipEmail
  relationshipImpact?: RelationshipImpact
  relationshipInterest?: RelationshipInterest
  relationshipLinkedinUrl?: RelationshipLinkedinUrl
  relationshipMetAt?: RelationshipMetAt
  relationshipPhone?: RelationshipPhone
  relationshipRole?: RelationshipRole
  relationshipSmsAllowed?: RelationshipSmsAllowed
  relationshipSmsHandlerTarget?: RelationshipSmsHandlerTarget
  relationshipTopicSlugs?: readonly RelationshipTopicSlugs[]
  relationshipNotes?: RelationshipNotes
}

export const relationship = {
  id: "01a06594-c6e2-7bab-9ba9-948b607cfd13",
  pageTypeSlug: "page-type",
  slug: "relationship",
  definition: "one person in Alan's life, and how close they stand",
  pluralSlug: "relationships",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/relationship-sms-allowed",
    "email-address-property/relationship-email",
    "file-property/relationship-notes",
    "number-property/relationship-commitment",
    "number-property/relationship-connection",
    "number-property/relationship-impact",
    "number-property/relationship-interest",
    "phone-number-property/relationship-phone",
    "relation-property/relationship-sms-handler-target",
    "relation-property/relationship-topic-slugs",
    "select-property/relationship-current-circle",
    "text-property/relationship-account-user-id",
    "text-property/relationship-aliases",
    "text-property/relationship-company",
    "text-property/relationship-met-at",
    "text-property/relationship-role",
    "url-property/relationship-linkedin-url",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "relationship-account-user-id", required: false, many: false },
    { pagePropertySlug: "relationship-aliases", required: false, many: true, max: null },
    { pagePropertySlug: "relationship-commitment", required: false, many: false },
    { pagePropertySlug: "relationship-company", required: false, many: false },
    { pagePropertySlug: "relationship-connection", required: false, many: false },
    { pagePropertySlug: "relationship-current-circle", required: false, many: false },
    { pagePropertySlug: "relationship-email", required: false, many: false },
    { pagePropertySlug: "relationship-impact", required: false, many: false },
    { pagePropertySlug: "relationship-interest", required: false, many: false },
    { pagePropertySlug: "relationship-linkedin-url", required: false, many: false },
    { pagePropertySlug: "relationship-met-at", required: false, many: false },
    { pagePropertySlug: "relationship-phone", required: false, many: false },
    { pagePropertySlug: "relationship-role", required: false, many: false },
    { pagePropertySlug: "relationship-sms-allowed", required: false, many: false },
    { pagePropertySlug: "relationship-sms-handler-target", required: false, many: false },
    { pagePropertySlug: "relationship-topic-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "relationship-notes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship is named by the person's own name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Four ratings stand apart: what this person changes, how much Alan wants them, how connected they already are, and what he means to keep putting in.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship stands whether or not the system reaches the person.",
    },
    {
      invariantKind: "departure",
      statement: "A person the system reaches is named here only where a text is routed.",
    },
    {
      invariantKind: "departure",
      statement: "One relationship may be a couple rather than one person.",
    },
    {
      invariantKind: "absence",
      statement: "A relationship is no person page.",
    },
  ],
} as const satisfies PageType
