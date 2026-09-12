import type { Message } from "akasha/alan/google/email/gmail-mailbox/gmail-mailbox.module.code.ts"
import type { Rule } from "akasha/alan/harness/email-watch/email-rule-reading/email-rule-reading.module.code.ts"
import { EMAIL_RULE_SET } from "akasha/alan/harness/email-watch/email-rule-set/email-rule-set.module.code.ts"
import type { Condition } from "akasha/alan/harness/rules-engine/rule-conditions/rule-conditions.module.code.ts"
import {
  type Case,
  matches as matchesIn,
} from "akasha/alan/harness/rules-engine/rule-partition/rule-partition.module.code.ts"

function caseOf(message: Message): Case {
  return {
    from: message.fromAddress,
    to: message.to,
    subject: message.subject,
    list: message.listId,
  }
}

function matches(conditions: readonly Condition[], message: Message): boolean {
  return matchesIn(EMAIL_RULE_SET, conditions, caseOf(message))
}

export function decide(rules: readonly Rule[], message: Message): Rule | null {
  return rules.find((rule) => matches(rule.conditions, message)) ?? null
}
