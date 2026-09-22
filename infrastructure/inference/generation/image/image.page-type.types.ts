import type { EsoDay } from "akasha/infrastructure/inference/generation/image/properties/eso-day.text-property.types.ts"
import type { ImageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.types.ts"
import type { ImagePersona } from "akasha/infrastructure/inference/generation/image/properties/image-persona.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { RelationshipLevel } from "akasha/persona/closeness-level/properties/relationship-level.relation-property.types.ts"

export type Image = Page & {
  bytes?: ImageBytes
  persona?: ImagePersona
  relationshipLevel?: RelationshipLevel
  esoDay?: EsoDay
}
