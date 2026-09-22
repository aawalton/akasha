import type { Role } from "akasha/agent/seat/properties/role.relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Phone } from "akasha/person/properties/phone.phone-number-property.types.ts"
import type { AnchorImage } from "akasha/persona/properties/anchor-image.relation-property.types.ts"
import type { Appearance } from "akasha/persona/properties/appearance.file-property.types.ts"
import type { ChampionedDomain } from "akasha/persona/properties/championed-domain.relation-property.types.ts"
import type { CoverImages } from "akasha/persona/properties/cover-images.multi-relation-property.types.ts"
import type { DesktopWallpaper } from "akasha/persona/properties/desktop-wallpaper.relation-property.types.ts"
import type { EmailAddress } from "akasha/persona/properties/email-address.email-address-property.types.ts"
import type { History } from "akasha/persona/properties/history.text-property.types.ts"
import type { LastMessagedAt } from "akasha/persona/properties/last-messaged-at.text-property.types.ts"
import type { MobileWallpaper } from "akasha/persona/properties/mobile-wallpaper.relation-property.types.ts"
import type { Origin } from "akasha/persona/properties/origin.relation-property.types.ts"
import type { PersonaRelationshipLevel } from "akasha/persona/properties/persona-relationship-level.computed-property.types.ts"
import type { PointsBeforeToday } from "akasha/persona/properties/points-before-today.number-property.types.ts"
import type { PointsToday } from "akasha/persona/properties/points-today.number-property.types.ts"
import type { PointsTotal } from "akasha/persona/properties/points-total.number-property.types.ts"
import type { Portrait } from "akasha/persona/properties/portrait.file-property.types.ts"
import type { Purpose } from "akasha/persona/properties/purpose.text-property.types.ts"
import type { Value } from "akasha/persona/properties/value.relation-property.types.ts"
import type { VoiceInstruction } from "akasha/persona/properties/voice-instruction.text-property.types.ts"
import type { VoiceReference } from "akasha/persona/properties/voice-reference.relation-property.types.ts"
import type { VoiceReferenceSha256 } from "akasha/persona/properties/voice-reference-sha256.text-property.types.ts"
import type { WallpaperImages } from "akasha/persona/properties/wallpaper-images.multi-relation-property.types.ts"

export type Persona = Domain & {
  purpose?: Purpose
  portrait?: Portrait
  appearance?: Appearance
  role?: Role
  value?: Value
  origin?: Origin
  email?: EmailAddress
  phone?: Phone
  championedDomain?: ChampionedDomain
  voiceInstruction?: VoiceInstruction
  voiceReferenceSha256?: VoiceReferenceSha256
  voiceReference?: VoiceReference
  pointsBeforeToday?: PointsBeforeToday
  pointsToday?: PointsToday
  pointsTotal?: PointsTotal
  relationshipLevel?: PersonaRelationshipLevel
  history?: History
  lastMessagedAt?: LastMessagedAt
  desktopWallpaper?: DesktopWallpaper
  mobileWallpaper?: MobileWallpaper
  anchor?: AnchorImage
  covers?: CoverImages
  wallpapers?: WallpaperImages
}
