import type { Page } from "akasha/page/page.page-type.types.ts"
import type { StyleExamples } from "akasha/story/style/style-rule/properties/style-examples.record-property.types.ts"
import type { StyleRuleAct } from "akasha/story/style/style-rule/properties/style-rule-act.standard-agent-english-property.types.ts"
import type { StyleRuleAids } from "akasha/story/style/style-rule/properties/style-rule-aids.standard-agent-english-property.types.ts"
import type { StyleRuleName } from "akasha/story/style/style-rule/properties/style-rule-name.text-property.types.ts"
import type { StyleRuleWarrant } from "akasha/story/style/style-rule/properties/style-rule-warrant.standard-agent-english-property.types.ts"

export type StyleRule = Page & {
  name: StyleRuleName
  act: StyleRuleAct
  warrant: StyleRuleWarrant
  aids?: StyleRuleAids
  examples?: StyleExamples
}
