import type {
  Field,
  RuleSet,
} from "akasha/alan/harness/rules-engine/field/modules/rule-fields/rule-fields.module.code.ts"

export const EMAIL_RULE_SET_NAME = "email-rule"

const FIELDS: readonly Field[] = [
  { name: "from", type: "text" },
  { name: "list", type: "text" },
  { name: "subject", type: "text" },
  { name: "to", type: "text" },
]

export const EMAIL_RULE_SET: RuleSet = {
  name: EMAIL_RULE_SET_NAME,
  fields: FIELDS,
}
