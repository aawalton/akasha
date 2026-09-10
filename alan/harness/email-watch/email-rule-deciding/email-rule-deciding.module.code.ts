import type { Condition } from "akasha/alan/harness/rules-engine/rule-conditions/rule-conditions.module.code.ts"
import {
  type Case,
  matches as matchesIn,
} from "akasha/alan/harness/rules-engine/rule-partition/rule-partition.module.code.ts"
import type { Message } from "akasha/google/email/gmail-mailbox/gmail-mailbox.module.code.ts"
import type { Rule } from "../email-rule-reading/email-rule-reading.module.code.ts"
import { EMAIL_RULE_SET } from "../email-rule-set/email-rule-set.module.code.ts"

export function caseOf(message: Message): Case {
  return {
    from: message.fromAddress,
    to: message.to,
    subject: message.subject,
    list: message.listId,
  }
}

export function matches(conditions: readonly Condition[], message: Message): boolean {
  return matchesIn(EMAIL_RULE_SET, conditions, caseOf(message))
}

export function decide(rules: readonly Rule[], message: Message): Rule | null {
  return rules.find((rule) => matches(rule.conditions, message)) ?? null
}
