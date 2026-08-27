---
id: a1d60cf9-b213-5ad1-80e9-4427ab14276a
page-type-slug: finding
title: "The edit command can report a refusal on a write it landed"
domain-slug: domain/ops-cli
---

# Claim

`ops instructions edit` can exit 1 saying `nothing was written` on a call that wrote, committed and pushed. An agent choosing its next act from that report will re-run the edit, or take a compensating act against a change that is already standing.

# Evidence

Seen on 2026-08-17 by a delegate rewiring the guard call sites in `tools/lib/spawn-seat.ts` and `tools/commands/seat/reset.ts`. Reported by that delegate; the refusal itself was not reproduced, but everything below was verified afterwards rather than taken on its account.

Its first invocation added one `DECLARATION_RELATIVE_PATH` constant to each of `tools/lib/spawn-guard.ts`, `tools/lib/skill-token-guard.ts` and `tools/lib/relaunch-name.ts`. The command exited 1 and printed `nothing was written`.

Commit `1eb66f987ad758734919f3dbd63f5092495fd221` stands, with the message the call was given, over exactly those three files, six insertions and no deletions. The landed content is correct: one constant per file, each naming its own path. `git merge-base --is-ancestor` puts it on `origin/main`, so the commit reached the remote as well.

That rules out the reading where a late step failed and the report described it: the write, the commit and the push all succeeded. Only the report was wrong.

The delegate's two follow-up re-runs, taken because the report said nothing had landed, both failed with `TS2451: Cannot redeclare block-scoped variable` — which can only arise against a tree where the first call had already written. So the false report cost two further calls and produced an error naming nothing about its real cause.

What makes this worth recording is the population rather than the instance. `Composed Outside` sends every gated write into this repository through this command or its sibling, so the report is what every agent reads to learn whether its own change landed. A false negative is worse here than a false positive: an agent told wrongly that it failed acts to repair something that is not broken, and the repair is written against a tree it has misread.
