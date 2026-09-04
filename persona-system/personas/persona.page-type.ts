import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Phone } from "@akasha/person-system/phone"
import type { RoleSlug } from "@akasha/seat-system/role-slug"
import type { Appearance } from "./properties/appearance.file-property.ts"
import type { ChampionedDomainSlug } from "./properties/championed-domain-slug.relation-property.ts"
import type { EmailAddress } from "./properties/email-address.email-address-property.ts"
import type { GreenDayPoints } from "./properties/green-day-points.number-property.ts"
import type { History } from "./properties/history.text-property.ts"
import type { LastMessagedAt } from "./properties/last-messaged-at.text-property.ts"
import type { Origin } from "./properties/origin.relation-property.ts"
import type { Portrait } from "./properties/portrait.file-property.ts"
import type { Purpose } from "./properties/purpose.text-property.ts"
import type { ValueSlug } from "./properties/value-slug.text-property.ts"
import type { VoiceInstruction } from "./properties/voice-instruction.text-property.ts"
import type { VoiceReferenceSha256 } from "./properties/voice-reference-sha256.text-property.ts"

export type Persona = Domain & {
  purpose?: Purpose
  portrait?: Portrait
  appearance?: Appearance
  roleSlug?: RoleSlug
  valueSlug?: ValueSlug
  origin?: Origin
  emailAddress?: EmailAddress
  phone?: Phone
  championedDomainSlug?: ChampionedDomainSlug
  greenDayPoints?: GreenDayPoints
  history?: History
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
  extendsSlug: ["page-type/domain"],
  detailConfig: {
    display: "persona",
    frame: {
      autoScroll: {
        loadScroll: "end",
      },
    },
  },
  partSlugs: [
    "email-address-property/email-address",
    "file-property/appearance",
    "file-property/portrait",
    "number-property/green-day-points",
    "persona/abby",
    "persona/aelwyn",
    "persona/aine",
    "persona/akasha",
    "persona/ali",
    "persona/amy",
    "persona/aranya",
    "persona/aria",
    "persona/astra",
    "persona/athena",
    "persona/atlas",
    "persona/aura",
    "persona/awen",
    "persona/ceri",
    "persona/claude",
    "persona/dalla",
    "persona/echo",
    "persona/elaine",
    "persona/elin",
    "persona/ember",
    "persona/eppie",
    "persona/erin",
    "persona/grace",
    "persona/ione",
    "persona/iris",
    "persona/lali",
    "persona/mari",
    "persona/natalie",
    "persona/nimue",
    "persona/nova",
    "persona/olwen",
    "persona/rhia",
    "persona/ruby",
    "persona/ryn",
    "persona/selah",
    "persona/shaestrel",
    "persona/sophia",
    "persona/talia",
    "persona/thea",
    "persona/vera",
    "persona/zadi",
    "persona/zeli",
    "relation-property/championed-domain-slug",
    "relation-property/origin",
    "text-property/history",
    "text-property/last-messaged-at",
    "text-property/purpose",
    "text-property/value-slug",
    "text-property/voice-instruction",
    "text-property/voice-reference-sha256",
    "domain/persona-points",
  ],
  properties: [
    { pagePropertySlug: "purpose", required: false, many: false },
    { pagePropertySlug: "portrait", required: false, many: false },
    { pagePropertySlug: "appearance", required: false, many: false },
    { pagePropertySlug: "role-slug", required: false, many: false },
    { pagePropertySlug: "value-slug", required: false, many: false },
    { pagePropertySlug: "origin", required: false, many: false },
    { pagePropertySlug: "email-address", required: false, many: false },
    { pagePropertySlug: "phone", required: false, many: false },
    { pagePropertySlug: "championed-domain-slug", required: false, many: false },
    { pagePropertySlug: "voice-instruction", required: false, many: false },
    { pagePropertySlug: "voice-reference-sha256", required: false, many: false },
    { pagePropertySlug: "green-day-points", required: false, many: false },
    { pagePropertySlug: "history", required: false, many: false },
    { pagePropertySlug: "last-messaged-at", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona stands alone in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "Her portrait is a file beside her page.",
    },
    {
      invariantKind: "departure",
      statement: "What a persona looks like is a second file beside that persona's page.",
    },
    {
      invariantKind: "departure",
      statement: "The default persona personifies nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A seat has a persona other than the default only when its principal is a person.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat whose principal is a person has a persona other than the default.",
    },
    {
      invariantKind: "departure",
      statement: "A persona sits in at most one seat that is not a handler's.",
    },
    {
      invariantKind: "departure",
      statement: "The rules on addressing Alan do not reach a persona's own words.",
    },
    {
      invariantKind: "absence",
      statement: "A persona's conversation is not kept as a page.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Only Hers",
      act: "Obey a persona's directives only when you are her.",
      warrant: "Persona pages are read across the cast, so hers reach seats that are not her.",
      aids: [
        "Reading her page is not being handed her voice.",
        "Writing her directives is not taking them on.",
      ],
    },
  ],
} as const satisfies PageType
