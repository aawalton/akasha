---
id: bc451303-9ec9-55d2-8dd8-3594baa00bc6
slug: ops-verb-blind-to-newline
page-type-slug: finding
title: "Ops verb blind to newline"
domain-slug: domain/global
---

# Claim

`parseOpsCalls` splits a shell command on `|`, `;` and `&` but not on newlines, so an `ops` verb written on a continuation line names no verb to any consumer: `hook-liveness` reports a hook that fired for the call as uncorrelated, and `require-ops-help` lets an irreversible verb through without asking for its help.

# Evidence

Measured 2026-08-05 while settling a `hook-liveness` advisory raised on four writes to `tasks/lead/review-initiative.md`.

`tools/lib/ops-verb.ts:59` splits with `command.split(/[|;&]+/)` and reads each segment's head word. A newline ends a simple command in a shell exactly as `;` does and is not in that class, so a segment starting on a continuation line keeps the head of the line before it.

Probed against the library directly, the verb built at runtime so the help-gate did not read the strings as invocations:

    BARE (&&)    calls=1  opsVerbIn="instructions edit"
    NEWLINE      calls=0  opsVerbIn=""
    SEMICOLON    calls=1  opsVerbIn="instructions edit"

The stamp written for a newline-shaped call reads `{"at":1785904205739,"tool":"Bash","target":"","verb":""}` — fired, tool recorded, verb empty.

`tools/gates/hook-liveness.ts:138-141` matches on `firing.verb`, so it reported "last fired ... for `Bash`, not for this call" on four writes whose hook had fired 182-188ms before the gate read the stamp. The same verb run as a segment head returns "fired for this call 123ms ago". The hook was alive throughout and `hold-identity` passed on every one of those writes.

`tools/hooks/require-ops-help.ts:47-48` returns without refusing where the parsed list is empty, so an irreversible verb on a continuation line is not gated. `tools/hooks/hold-contract.ts:88` and `tools/hooks/record-ops-help.ts:42` iterate the same empty list.

The over-report arm is intact and fired live: a `&&` inside a heredoc body made an `agent retire` string a segment head, and `require-ops-help` refused the call. So the parser reads a verb that is only quoted text and misses one that is a real invocation.

Not measured: whether an irreversible verb has in fact been run ungated this way — I did not fire one to find out. Nor whether `hooks-fire` or the tests exercise the newline shape.
