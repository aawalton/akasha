---
id: ac4c0234-0180-5332-a0dd-3e0e40696324
page-type-slug: task
title: "Change email rules"
slug: change-email-rules
domain-parent-slug: rules-engine-rule-set/email-rule
required-reading-slugs:
  - page-type/task
---

# Definition

- **Change email rules** — turning mail his rules got wrong into a change to the set they are.

# Sequence

1. **What should have happened to the mail.**
   - **Say** what was done with the message and what he wanted instead, in his words rather than the set's. What reaches you is a complaint about one message, and the rule that has to change is usually not the one that acted.
   - **Name** the class of mail it belongs to before opening any rule. His standing principles are about classes, and a rule cut to fit the single message he complained about answers a question nobody asked.

2. **What the set already does with it.**
   - **Read** every rule whose conditions touch the same sender, list or subject, across `email/alan/rules/code/` and `email/alan/rules/agent/`. The folder is the kind rather than a key, and the set is proven whole, so what you write is judged against all of them and not against the one that acted.
   - **Expect** the residual agent rule to have taken anything no other rule claimed. Mail it handled reads as unmatched and is not, so a rule written for that mail puts two claims on it.

3. **The rule, or the edit to one already standing.**
   - **Widen** a rule that already names the class rather than adding one beside it. Two rules for one class are what later disagree, and the proof reports that as an overlap rather than as the duplication it is.
   - **Write** a code rule where every message it matches deserves the same act, and an agent rule where the act turns on what the message says. `actions:` takes exactly one of `archive` and `skip`, alongside any of `notify`, `unsubscribe` and `forward`; `forward` and `forward-to-slug:` each require the other.
   - **Match** on `from`, `to`, `subject` or `list`, comparing with `is`, `starts with`, `ends with` or `contains`, and take the values from the header text the sender actually stamps. There is no regular expression among them and every comparison is blind to case.
   - **Set** `delay:` as a count of minutes or hours only where acting at once would be wrong and acting later is still right.

4. **Landing it, and the set still being a partition.**
   - **Compose** the file outside the repository and land it through `ops write`, which gates it against the page type, the actions it may state and every document required for the path.
   - **Run** `ops akasha run-checks email-rules-disjoint email-rules-cover` after it lands, and read both. Two rules never firing on one message and no message falling through are separate claims, and a rule can break either one while the write is admitted.
   - **Read** what a failing check names instead of narrowing the new rule until it goes green. An overlap names a pair, and which of the two is the wrong one is a judgment rather than a repair.

# Invariants

- **A new rule reaches only mail that arrives after it lands.** The watcher asks the mailbox what has been added since its last pass rather than reading the inbox, so everything already sitting there is past every rule and stays where it is. Clearing what has piled up is a separate act from writing the rule that will keep it clear, and doing the second reads exactly like having done both.
- **The mailbox is outside this repository and a rule acts within a minute.** An archive, an unsubscribe or a forward has left for a service nobody here controls before anything reports it, so a rule that turns out wrong is corrected forward rather than undone.
