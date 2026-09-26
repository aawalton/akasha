import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { StyleExampleAfter } from "akasha/story/style/style-rule/properties/style-example-after.text-property.types.ts"
import type { StyleExampleBefore } from "akasha/story/style/style-rule/properties/style-example-before.text-property.types.ts"

export type StyleExamples = List<{
  before: StyleExampleBefore
  after: StyleExampleAfter
}>
