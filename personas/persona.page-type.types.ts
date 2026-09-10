import type { PointsBeforeToday } from "../alan/attributes/properties/points-before-today.number-property.ts"
import type { PointsToday } from "../alan/attributes/properties/points-today.number-property.ts"
import type { PointsTotal } from "../alan/attributes/properties/points-total.number-property.ts"
import type { Domain } from "../domains/domain.page-type.types.ts"
import type { Phone } from "../persons/people/properties/phone.phone-number-property.ts"
import type { Role } from "../seat-system/seats/properties/role.relation-property.ts"
import type { Appearance } from "./properties/appearance.file-property.ts"
import type { ChampionedDomain } from "./properties/championed-domain.relation-property.ts"
import type { DesktopWallpaper } from "./properties/desktop-wallpaper.file-property.ts"
import type { EmailAddress } from "./properties/email-address.email-address-property.ts"
import type { GreenDayPoints } from "./properties/green-day-points.number-property.ts"
import type { History } from "./properties/history.text-property.ts"
import type { LastMessagedAt } from "./properties/last-messaged-at.text-property.ts"
import type { MobileWallpaper } from "./properties/mobile-wallpaper.file-property.ts"
import type { Origin } from "./properties/origin.relation-property.ts"
import type { PersonaRelationshipLevel } from "./properties/persona-relationship-level.computed-property.ts"
import type { Portrait } from "./properties/portrait.file-property.ts"
import type { Purpose } from "./properties/purpose.text-property.ts"
import type { ValueSlug } from "./properties/value-slug.text-property.ts"
import type { VoiceInstruction } from "./properties/voice-instruction.text-property.ts"
import type { VoiceReferenceSha256 } from "./properties/voice-reference-sha256.text-property.ts"

export type Persona = Domain & {
  purpose?: Purpose
  portrait?: Portrait
  appearance?: Appearance
  role?: Role
  valueSlug?: ValueSlug
  origin?: Origin
  email?: EmailAddress
  phone?: Phone
  championedDomain?: ChampionedDomain
  voiceInstruction?: VoiceInstruction
  voiceReferenceSha256?: VoiceReferenceSha256
  greenDayPoints?: GreenDayPoints
  pointsBeforeToday?: PointsBeforeToday
  pointsToday?: PointsToday
  pointsTotal?: PointsTotal
  relationshipLevel?: PersonaRelationshipLevel
  history?: History
  lastMessagedAt?: LastMessagedAt
  desktopWallpaper?: DesktopWallpaper
  mobileWallpaper?: MobileWallpaper
}
