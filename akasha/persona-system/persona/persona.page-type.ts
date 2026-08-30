import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { RoleSlug } from "../../seat-system/seat/properties/role-slug.text-property.ts"
import type { ChampionedDomainSlug } from "./properties/championed-domain-slug.text-property.ts"
import type { EmailAddress } from "./properties/email-address.text-property.ts"
import type { GreenDayPoints } from "./properties/green-day-points.number-property.ts"
import type { LastMessagedAt } from "./properties/last-messaged-at.text-property.ts"
import type { Origin } from "./properties/origin.relation-property.ts"
import type { Portrait } from "./properties/portrait.file-property.ts"
import type { Purpose } from "./properties/purpose.text-property.ts"
import type { ValueSlug } from "./properties/value-slug.text-property.ts"
import type { VoiceInstruction } from "./properties/voice-instruction.text-property.ts"
import type { VoiceReferenceSha256 } from "./properties/voice-reference-sha256.text-property.ts"

export type Persona = Domain & {
  purpose: Purpose
  portrait: Portrait
  roleSlug: RoleSlug
  valueSlug: ValueSlug
  origin: Origin
  emailAddress?: EmailAddress
  championedDomainSlug?: ChampionedDomainSlug
  greenDayPoints?: GreenDayPoints
  lastMessagedAt?: LastMessagedAt
  voiceInstruction?: VoiceInstruction
  voiceReferenceSha256?: VoiceReferenceSha256
}

export const persona = {
  id: "01a0532a-a54d-76e7-98f5-57ff3efc6492",
  pageTypeSlug: "page-type",
  slug: "persona",
  definition: "a part of Alan's life personified as someone who answers for it",
  pluralSlug: "personas",
  extendsSlug: "page-type/domain",
  partSlugs: [
    "file-property/portrait",
    "number-property/green-day-points",
    "relation-property/origin",
    "text-property/championed-domain-slug",
    "text-property/email-address",
    "text-property/last-messaged-at",
    "text-property/purpose",
    "text-property/role-slug",
    "text-property/value-slug",
    "text-property/voice-instruction",
    "text-property/voice-reference-sha256",
  ],
  properties: [
    { pagePropertySlug: "purpose", required: true, many: false },
    { pagePropertySlug: "portrait", required: true, many: false },
    { pagePropertySlug: "role-slug", required: true, many: false },
    { pagePropertySlug: "value-slug", required: true, many: false },
    { pagePropertySlug: "origin", required: true, many: false },
    { pagePropertySlug: "email-address", required: false, many: false },
    { pagePropertySlug: "championed-domain-slug", required: false, many: false },
    { pagePropertySlug: "voice-instruction", required: false, many: false },
    { pagePropertySlug: "voice-reference-sha256", required: false, many: false },
    { pagePropertySlug: "green-day-points", required: false, many: false },
    { pagePropertySlug: "last-messaged-at", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This states only some of what a persona holds, so the old persona stands until every property is reviewed and moved.",
    },
    {
      invariantKind: "departure",
      statement: "A persona stands alone in a folder, her portrait being a file beside her page.",
    },
  ],
} as const satisfies PageType
