---
id: 843329aa-63d0-5292-87dd-3f22af4715f1
page-type-slug: finding
title: "Completely blocked unenforced"
domain-slug: domain/seat-turn-end
---

# Claim

The decider lets a dispatched seat go on any armed wake source alone, which establishes blocked and not the `completely blocked` its governing sentence asks for, and the one arm that used to catch the gap left with the rules engine.

# Evidence

Read 2026-08-15 against `tools/lib/turn-end-decide.ts` at c4b96dbf.

`domains/agent-turn-end.md` holds as Intent that a turn ends only where the agent is completely blocked or done.

`decideTurnEnd` computes `pending` from `turnStartSourceFrom`, which answers yes on a running task, a session cron, a live child, an open question, an unanswered send or a held wake. A dispatched seat then reaches `allow("wake-pending")` on `pending` alone. Nothing between the two looks at whether the seat announced an act it has not taken, so a seat with work it could still do is let go whenever anything at all is armed.

Every one of those six sources is a fact about something the seat already did that will call it back. That is what blocked means, and it is silent on whether a next act exists.

This was first filed on 2026-08-12 against the retired `turn-end-rule` domain as `completely-not-enforced`, when Alan ruled to leave it and read the corpus first. It is refiled here rather than restored because what carried it then is gone: `own-act-next` was the refusal for exactly this case and fired 172 times in the sixteen days to 2026-08-12. bc150b293 inlined the decision on 2026-08-14 and `own-act-next` is now emitted by nothing, so the case that used to be refused is now allowed.

Not measured: how many turn ends since 2026-08-14 would have drawn `own-act-next`. The records carry the reason that fired, never the one that would have, so the number cannot be recovered from them.
