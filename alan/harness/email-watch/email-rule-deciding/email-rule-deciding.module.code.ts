import type { Condition } from "@akasha/rules-engine/rule-conditions"
import { type Case, matches as matchesIn } from "@akasha/rules-engine/rule-partition"
import type { Message } from "akasha/google/email/gmail-mailbox/gmail-mailbox.module.code.ts"
import type { Rule } from "../email-rule-reading/email-rule-reading.module.code.ts"
import { emailRuleSet } from "../email-rule-set/email-rule-set.module.code.ts"

export function caseOf(message: Message): Case {
  return {
    from: message.fromAddress,
    to: message.to,
    subject: message.subject,
    list: message.listId,
  }
}

export function matches(conditions: readonly Condition[], message: Message): boolean {
  return matchesIn(emailRuleSet, conditions, caseOf(message))
}

export function decide(rules: readonly Rule[], message: Message): Rule | null {
  return rules.find((rule) => matches(rule.conditions, message)) ?? null
}
