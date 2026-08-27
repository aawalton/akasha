---
id: 74cd4046-fa02-58f8-a107-1792b8c3c0fb
page-type-slug: finding
title: "Dismissed hourly confirm wakes for nothing"
domain-slug: task/capture-time-tracking
---

# Claim

Dismissing an hourly tracking confirmation wakes Amy's handler seat with a notice nothing acts on. A dismissal already clears every gate that could hold the stream, so the seat is woken, reads a sentence, and has no work to do. Alan reported it as a cost on 2026-08-10; project #18344 carries the change.

# Evidence

`resolveQuestion` in `packages/alanwalton/web/app/questions/lib/resolve-question.server.ts:353-374` takes the same delivery path on a dismissal as on a free-text answer: it resolves the asker, then wakes it with `Your question was dismissed without an answer: "<title>"` under source `question-dismiss`. For this loop the asker is not a persona at all — `automationSeat` at line 113 maps `sourceContext === "tracking-hourly-confirm"` to `HOURLY_CONFIRM_ANSWER_SEAT`, which `packages/alanwalton/daily-tracking/src/hourly-confirm.ts:47` declares as `ALAN_HANDLER_SEAT`, resolving to `amy-handler` in the built `dist/src/hourly-confirm.d.ts:39`.

The notice is owed to a persona because a dismissal resolves the latch she is blocked on — the comment at line 354 says exactly that, and `packages/agents/routing-core/src/standing-persona-spec.ts:107` declares `<name>-question-dismiss` as a wake rule for a seat blocked on the answer. This loop's seat is not blocked. A timer fires the question and nothing waits on it.

Neither gate in `decideHourlyConfirm` (`packages/alanwalton/daily-tracking-cli/src/lib/hourly-confirm.ts:154-194`) holds on a dismissed row. `question-already-open` matches `OPEN_QUESTION_STATUS` only. `awaiting-reconciliation` reads `selectUnreconciledQuestions`, which requires `status === ANSWERED_QUESTION_STATUS` at line 99 — and that function's own doc comment at lines 86-91 records why: a dismissal writes `answeredAt` too, so applied-ness read off that instant alone would hold forever on every dismissed question, and `hourly-confirm-reconcile` refuses to stamp anything not `answered`, making such a hold unreleasable. The status term exists precisely so a dismissal does not stall the stream.

So the next hour fires normally whether or not the seat is ever told, and `hourly-confirm-reconcile` would refuse the row if the seat tried to act on the notice.
