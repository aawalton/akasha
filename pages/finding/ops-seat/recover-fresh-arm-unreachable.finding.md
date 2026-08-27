---
id: a904d957-2b18-507f-8e69-d6f7e4c89cb2
page-type-slug: finding
title: "The fresh arm of the seat recovery path has no caller"
domain-slug: domain/ops-seat
---

# Claim

`RecoverMode`'s `fresh` branch in the seat recovery path is unreachable. Its
only caller passes `resume`, and the refusal that branch exists to produce
directs the reader to a command that does not exist.

# Evidence

`tools/lib/recover-seat.ts` declares `RecoverMode` as `{ kind: "resume" } |
{ kind: "fresh"; prompt: string }`. `recoverSeat` is called from exactly one
site, `tools/commands/seat/restart.ts:138`, which passes `mode: { kind:
"resume" }`. The `fresh` arm carries the `clearSessionCurrent` call and the
prompt-seeding launch, neither of which any caller reaches.

Two error strings named `ops seat reset`, which the namespace does not hold;
both were repaired to name `ops seat start` at dc0fc723. The dead arm itself
was left standing.

`resumePolicy: { kind: "fresh" }` in `tools/lib/recipient-resolver-registry.ts`
is a different type (`decide-wake-match.ts`) and is live — it is not evidence
this arm is reached.

NOT MEASURED: whether the arm is kept deliberately against a caller intended
but not yet written. Git history was not read for when the last caller went.
