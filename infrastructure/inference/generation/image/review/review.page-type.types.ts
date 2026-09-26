import type { ReviewPersona } from "akasha/infrastructure/inference/generation/image/review/properties/review-persona.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Review = Page & {
  persona?: ReviewPersona
}
