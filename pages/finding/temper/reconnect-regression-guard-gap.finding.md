---
id: 586f80bc-e0b9-535e-b0bc-fccd6c5d771a
slug: reconnect-regression-guard-gap
page-type-slug: finding
title: "Reconnect regression guard gap"
domain-slug: domain/temper
---

# Claim

The fix for #16061 (re-entrancy in `realtime.ts`'s status callback, caused by `removeChannel` driving the channel CLOSED synchronously and re-entering the callback before the guard was armed) is landed, verified and correct, but the retained regression test pins only the pure decider (`decideReconnectArming`) and cannot catch a re-introduction of the actual defect, because the defect was in the shell's ordering of check/teardown/arm rather than in the decider's output.

# Evidence

Project #16180, domain `temper`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Filed by ember while verifying #16061, from that row's own disclosure, 2026-07-25T13:51. Fix landed, verified, correct; this is a regression-guard gap.

Root cause of #16061: re-entrancy in the effectful shell (`realtime.ts`), not the backoff logic. Guard checked at :258, armed at :272, teardown at :266. `removeChannel` drives the channel CLOSED synchronously (phoenix `leave()` fires `leavePush.trigger("ok")` inline when `canPush()` is false, always true on the error path), so teardown re-entered the status callback from inside its own call while the guard was still unset, recursing to stack exhaustion. 9 process deaths in 16 hours.

Reproduction proved it end-to-end: a fake client faithful to two real supabase behaviours (channel() dedupes by topic; removeChannel fires CLOSED synchronously) — one disconnect produced 7987 removeChannel calls unfixed, 1 fixed. Could not be retained: typing the fake as `WatcherSupabaseClient` needs a forbidden type assertion; supabase-js's `.on()` generic overload set defeats structural narrowing. Traded for a pure decider (`decideReconnectArming`, realtime-backoff.ts:83) plus a contract test.

Residual: the retained test pins the decider (2000 synchronous re-entries -> exactly one arming) and cannot catch a re-introduction of the actual defect, since the defect was in the shell's ORDER of check/teardown/arm, not the decider's output. A future edit restoring the bad order leaves the decider's test green — confirmation decoupled from the effect.

What would close it: a regression guard bound to the shell's ordering, blocked on the same typing problem — as much a type-design question as a test question.

Not urgent: fix is live, CI was 89/89 (all exitCode 0, verified off `pipeline steps --json`), both `.catch` sites now log.
