---
id: 3a8cf271-f553-55b3-9798-5759f48e27c8
page-type-slug: finding
title: "Never runs rests on an unwatched absence"
domain-slug: page-type/refusal
---

# Claim

`refusals/hook-inert.md`'s "it never runs" rests on the user settings tier being absent, and `hooks-agree.ts` skips rather than reports when it is — so if a user tier ever appears carrying hooks, the sentence goes quietly false and nothing in the repo says so.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-inert.md` dispatched from `review-documents`. The reading verified the present state outside the corpus and raised the latency; the skip was read here.

The body concludes that a script named by no registration and no disabled entry "never runs". The reading confirmed that today: neither `~/.claude/settings.json` nor the account-tier file under `CLAUDE_CONFIG_DIR` exists, so the user-tier registry is empty.

`tools/checks/hooks-agree.ts:85` returns `skip(NAME, `${userPath} is not there, so no session loads a second copy of the set`)` with a population of 0. A skip is not a finding, so the absence is reported as nothing to check rather than as a condition something depends on.

Nothing else watches it. `hooks-registered` reads `settings/agents.json`; `bash-env-inside` reads that one file and its own test is named "nothing here reads a second one".

So the truth of a refusal body is conditional on a file whose appearance no instrument would report — and the failure is silent in the direction that matters, since a hook running when the corpus says it never runs is worse than the reverse.

This is the third claim in the corpus found resting on the unmeasured user tier. The first is `pages/finding/refusal/bash-env-merge-precedence-unmeasured.finding.md`. The second is `refusals/hook-missing-from-payload.md`'s "That hook does not fire for that seat": the client unions `hooks` across settings sources — which is why `hooks-agree` exists at all, a hook in both files firing twice — so a hook missing from the payload would still fire if the user tier registered it. Its reading left the line and reported it, the file being absent and `settings.local.json` holding theme and model only.

Not measured: whether a user tier has ever existed on this workstation, or what would create one.
