---
id: 1dac31ac-3330-564c-9f42-63ba85ea296c
page-type-slug: finding
title: "Prose counts drift untracked"
domain-slug: repo/code-repo
---

# Claim

Four prose counts in the code repository state a numeral for a set the stating file does not define, and all four disagree with that set today — in both directions, two of them having gone stale and then true again as the set moved underneath them.

# Evidence

At `origin/main` `13135651993c19af09ce41b6295264191071d3c1`, while emptying `dirty/questions/code-repo-stale-docblock-counts.md`, whose entries were measured at the older `77685cfbf553b085d095c4fc334c95d4bd7d89e6`.

`packages/infra/checks/src/lib/liveness-subject.ts:18` argues against "a collapse table over all twenty subjects — that would spend nineteen manufactured justifications"; `SampledObject` in `packages/agents/shared/agent-liveness-observation.ts` declares 23 arms. Its line 42 says `ENVELOPE_SIGNALS` picks "5 of the census's 30 catalogued carries-verdict signals"; `VERDICT_SIGNALS` holds 35, though the 5 is exact.

`packages/shared/utils/process/src/pid-signal.ts:19` says callers read `EPERM` "most as alive, one as dead, one refuses to guess and throws". Over the 12-file non-test population `check-liveness-collapse` reports, nine fold `true`, two fold `false` (`reauth-shell.ts`, `boot-cache.ts`), one refuses (`supervisor-exec.ts`). "One" names two.

`pid-signal.unit.test.ts:199` says "two of the twelve converted sites already guard `pid <= 1`". `git grep 'pid <= 1'` returns two lines, both `packages/agents/oauth/src/reauth-shell.ts`, at 116 and 132 — one caller at two of its own entry points.

`temper/player/inventory-management/cli/src/temper/inventory/rule/registry.ts` says the parent spreads once "the three sub-namespace registries (rule / item-rule / automation)" land, and `automation/registry.ts` names siblings `RULE_COMMANDS` / `ITEM_RULE_COMMANDS`. The parent spreads four.

Two reversed underneath the entries correcting them. The test comment's "twelve" was recorded as wrong when the population was thirteen; the check now reports 12 of 12, so it came back true without moving. The docstring's dead-readers were enumerated as three, and `findings-lock.ts` has since left the repo.

No instrument reports any of it. `check-prose-mechanism-restatement.ts` is keyed on `md-file:` nodes and asks whether a restatement exists rather than whether it matches.
