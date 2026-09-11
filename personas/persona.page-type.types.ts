import type { PointsBeforeToday } from "akasha/alan/attributes/properties/points-before-today.number-property.types.ts"
import type { PointsToday } from "akasha/alan/attributes/properties/points-today.number-property.types.ts"
import type { PointsTotal } from "akasha/alan/attributes/properties/points-total.number-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Appearance } from "akasha/personas/properties/appearance.file-property.ts"
import type { ChampionedDomain } from "akasha/personas/properties/championed-domain.relation-property.types.ts"
import type { DesktopWallpaper } from "akasha/personas/properties/desktop-wallpaper.file-property.ts"
import type { EmailAddress } from "akasha/personas/properties/email-address.email-address-property.types.ts"
import type { GreenDayPoints } from "akasha/personas/properties/green-day-points.number-property.types.ts"
import type { History } from "akasha/personas/properties/history.text-property.ts"
import type { LastMessagedAt } from "akasha/personas/properties/last-messaged-at.text-property.ts"
import type { MobileWallpaper } from "akasha/personas/properties/mobile-wallpaper.file-property.ts"
import type { Origin } from "akasha/personas/properties/origin.relation-property.types.ts"
import type { PersonaRelationshipLevel } from "akasha/personas/properties/persona-relationship-level.computed-property.types.ts"
import type { Portrait } from "akasha/personas/properties/portrait.file-property.ts"
import type { Purpose } from "akasha/personas/properties/purpose.text-property.ts"
import type { ValueSlug } from "akasha/personas/properties/value-slug.text-property.ts"
import type { VoiceInstruction } from "akasha/personas/properties/voice-instruction.text-property.ts"
import type { VoiceReferenceSha256 } from "akasha/personas/properties/voice-reference-sha256.text-property.ts"
import type { Phone } from "akasha/persons/people/properties/phone.phone-number-property.types.ts"
import type { Role } from "akasha/seat-system/seats/properties/role.relation-property.types.ts"

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
