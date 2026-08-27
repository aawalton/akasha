---
id: cc831599-a4fa-52c5-a07c-d382ba3f5f83
slug: hook-liveness-advisory-on-ordinary-writes
page-type-slug: finding
title: "Hook liveness advisory on ordinary writes"
domain-slug: domain/global
---

# Claim

The `hook-liveness` advisory fires on ordinary writes. Dispatched seats reading refusal documents on 2026-08-12 keep having it return on every `ops instructions write` they made, unable to show the call had passed through `tools/hooks/hold-seat.ts` because that hook had last fired about 200ms earlier for a different Bash call. The `hold-seat` gate itself passed on the same writes.

# Evidence

Reported independently by dispatched `review-instructions` seats on 2026-08-12, which named the hook's own text as saying the case is ordinary when a command is named through a variable — their writes were `ops` invocations inside heredoc-bearing compound commands. One seat recorded `hook-liveness` passing on the dry run before the write and on the stamp commit after it, and failing to show the write between them.

Not measured: what share of writes across the fleet draw the advisory, and whether it has ever fired on a call that genuinely bypassed the hook.
