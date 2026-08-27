---
id: 69d63d46-5215-5d0d-bfe3-298ebc9677a9
page-type-slug: finding
title: "Marker order docblock inverted"
domain-slug: domain/alanwalton-app
---

# Claim

`markProcessed`'s docblock in the email pages-store instructs its callers to write the marker BEFORE acting, and gives a crash-safety reason for it. Its only production caller does the opposite in every arm that takes a live action, and the design it actually implements is the one the docblock argues against.

# Evidence

In `packages/alanwalton/email/google/src/pages-store.ts` the docblock above `markProcessed` reads: "Record the deliver-once / act-once marker for `messageId`. Idempotent: the `where` matches at most one row, so a repeat patches in place. Write this BEFORE acting so a crash mid-act degrades to a skipped message, never a loop."

The only production caller is `packages/alanwalton/email/watcher/src/tick.ts`, in `processMessage`'s `switch (decision.action)`. Every arm that takes a live action marks AFTER it:

- `archive`: `await archiveMessage(client, messageId)` then `await markProcessed(sb, messageId, "archive")`.
- `unsubscribe-archive`: the best-effort unsubscribe `try`/`catch`, then `await archiveMessage(client, messageId)`, then `await markProcessed(sb, messageId, "unsubscribe-archive")`.
- `forward`: `await sendMessage(client, …)`, then `await archiveMessage(client, messageId)`, then `await markProcessed(sb, messageId, "forward")`.

The arms that mark first (`skip-spam`, `skip-self-sent`, `ignore`, `surface`, `agent-handle`) take no external action at all, so the ordering is not exercised there.

The two orderings are not interchangeable, and the caller's is deliberate. `runEmailTick`'s step 4 comment states the design the code implements — "a failure leaves the message UNmarked so it retries" — and the surrounding `try`/`catch` logs "(will retry next tick)" without marking. That is the opposite outcome from the docblock's "a crash mid-act degrades to a skipped message": marking first would drop a message whose archive or forward never completed, and the `forward` arm's own fallback path exists precisely so mail is never lost.

Read at `~/code` on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-email-watcher-claude.md`. That quarantined document stated the caller's ordering correctly and is being removed with the sweep, so the disagreement would have gone with it.
