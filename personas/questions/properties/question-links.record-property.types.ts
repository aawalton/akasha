import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { LinkLabel } from "akasha/personas/questions/properties/link-label.text-property.types.ts"
import type { LinkPlatform } from "akasha/personas/questions/properties/link-platform.select-property.types.ts"
import type { LinkTarget } from "akasha/personas/questions/properties/link-target.text-property.types.ts"

export type QuestionLinks = List<{
  label: LinkLabel
  target: LinkTarget
  platform: LinkPlatform
}>
