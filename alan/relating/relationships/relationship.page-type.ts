import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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
import type { RelationshipTopicSlugs } from "./properties/relationship-topic-slugs.relation-property.ts"

export type Relationship = Page & {
  title: Title
  relationshipAccountUserId?: RelationshipAccountUserId
  relationshipAliases?: readonly RelationshipAliases[]
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
  relationshipTopicSlugs?: readonly RelationshipTopicSlugs[]
  relationshipNotes?: RelationshipNotes
}

export const relationship = {
  id: "01a06594-c6e2-7bab-9ba9-948b607cfd13",
  pageTypeSlug: "page-type",
  slug: "relationship",
  definition: "one person in Alan's life, and how close they are",
  pluralSlug: "relationships",
  extendsSlug: ["page-type/page"],
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
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "text-property/relationship-account-user-id",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "text-property/relationship-aliases",
      required: false,
      many: true,
      max: null,
    },
    { pagePropertySlug: "number-property/relationship-commitment", required: false, many: false },
    { pagePropertySlug: "text-property/relationship-company", required: false, many: false },
    { pagePropertySlug: "number-property/relationship-connection", required: false, many: false },
    {
      pagePropertySlug: "select-property/relationship-current-circle",
      required: false,
      many: false,
    },
    { pagePropertySlug: "email-address-property/relationship-email", required: false, many: false },
    { pagePropertySlug: "number-property/relationship-impact", required: false, many: false },
    { pagePropertySlug: "number-property/relationship-interest", required: false, many: false },
    { pagePropertySlug: "url-property/relationship-linkedin-url", required: false, many: false },
    { pagePropertySlug: "text-property/relationship-met-at", required: false, many: false },
    { pagePropertySlug: "phone-number-property/relationship-phone", required: false, many: false },
    { pagePropertySlug: "text-property/relationship-role", required: false, many: false },
    { pagePropertySlug: "boolean-property/relationship-sms-allowed", required: false, many: false },
    {
      pagePropertySlug: "relation-property/relationship-sms-handler-target",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "relation-property/relationship-topic-slugs",
      required: false,
      many: true,
      max: null,
    },
    { pagePropertySlug: "file-property/relationship-notes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship is named by the person's own name.",
    },
    {
      invariantKind: "departure",
      statement: "Four ratings sit apart: impact, interest, connection, and commitment.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship exists whether or not the system reaches the person.",
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
