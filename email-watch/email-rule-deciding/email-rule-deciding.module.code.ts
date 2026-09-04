import type { Rule } from "@akasha/email-watch/email-rule-reading"
import { emailRuleSet } from "@akasha/email-watch/email-rule-set"
import type { Message } from "@akasha/google-email/gmail-mailbox"
import type { Condition } from "@akasha/rules-engine/rule-conditions"
import { type Case, matches as matchesIn } from "@akasha/rules-engine/rule-partition"

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
