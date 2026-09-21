import type { ActionButtonVerb } from "akasha/page/action-button-property/properties/action-button-verb.text-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type ActionButtonProperty = PageProperty & {
  verbId: ActionButtonVerb
}
