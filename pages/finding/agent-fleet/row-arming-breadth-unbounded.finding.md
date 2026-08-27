---
id: 58ba68b1-3f89-5e1c-97e0-a16492a3d74d
page-type-slug: finding
title: "Row arming breadth unbounded"
domain-slug: domain/agent-fleet
---

# Claim

Nothing bounds how BROADLY a persona row may arm itself. `ruleMatches` tests `sender.includes(senderMatch)`, so a row declaring `senderMatch: "system"` arms that persona for every `system:*` source at once. The parse-time refine asks only that a rule constrains on something, never that it constrains narrowly, and the norm against a bare prefix is carried by one docblock sentence and two test comments. Row sources are data: they arm with no deploy.

# Evidence

Read from source at `~/code`, and measured against the live `public.pages` rows.

The matcher is a substring test: `packages/agents/routing-core/src/rule-matches.ts:17` is `input.sender.includes(rule.senderMatch)`, guarded only by a non-empty sender. A shorter declaration matches strictly more senders.

The only breadth guard refuses the empty rule. `constrainsOnSomething` at `on-demand-agent-spec.ts:130` returns `senderMatch.length > 0 || (contentRegex ?? "").length > 0`, and `row-wake-source.ts` applies that same refine at the RULE level for the persona path. Both refuse a rule constraining on NOTHING; neither asks how much a non-empty one matches.

The norm exists only as prose. `standing-persona-spec.ts`'s header says a ratified sender stamps a precise source, "the `sms:ki-handler` idiom, never bare `system`", repeated at `standing-persona-spec.unit.test.ts:89` and `wake-armed-seats.unit.test.ts:57`. The test at `standing-persona-spec.unit.test.ts:300` pins that bare `system` wakes nothing for amy — which holds because HER declaration is precise, not because anything refuses an imprecise one.

The incident is in that same docblock: the uniform four replace the universal arming "which every string matches — the mechanism by which one fleet-halt broadcast revived 41 dormant agents".

Measured, and the gap is open rather than exercised. `ops page list --type persona --count` returns 42 rows; `--properties wakeSources --all` shows 4 declaring anything, 5 rules, each `senderMatch` a precise tag such as `system:email-surface`. No row declares a bare prefix today.

Not the finding beside it. `pages/finding/agent-fleet/ratification-arming-unseen.finding.md` is that the pure decider cannot SEE row-declared sources, so an authorised revival may not happen. This is the other direction: what a row declares is visible and unbounded in breadth, so an unintended revival can. I read it whole before filing.

Not measured. I did not look for an instrument outside the refine that reviews breadth, nor read the page-type definition for `wakeSources`.
