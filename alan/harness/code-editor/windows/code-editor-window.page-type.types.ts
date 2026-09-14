import type { ObservedAt } from "akasha/alan/harness/code-editor/windows/properties/observed-at.instant-property.types.ts"
import type { WindowFeatures } from "akasha/alan/harness/code-editor/windows/properties/window-features.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type CodeEditorWindow = Page & {
  observedAt?: ObservedAt
  features?: WindowFeatures
}
