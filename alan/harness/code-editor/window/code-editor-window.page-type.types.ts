import type { ObservedAt } from "akasha/alan/harness/code-editor/window/properties/observed-at.instant-property.types.ts"
import type { WindowFeatures } from "akasha/alan/harness/code-editor/window/properties/window-features.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type CodeEditorWindow = Page & {
  observedAt?: ObservedAt
  features?: WindowFeatures
}
