---
id: 110ee103-73b4-5e97-84e5-85c6066f6606
page-type-slug: finding
title: "Inbox attribute names declared twice"
domain-slug: domain/global
---

# Claim

The eight `daily-tracking` attribute names the inbox poller writes and the status bar reads are declared twice, in two packages with no dependency between them. `@alanwalton/inbox-tracking-core` states its names must stay identical to the reader's and calls itself their one source of truth; `@shared/status-bar-access` re-declares its own literal maps and never imports it. Nothing refuses a divergence, and the two copies agree today, which is the state in which neither gets opened.

# Evidence

Found 2026-08-08 while emptying `dirty/code/packages-alanwalton-inbox-tracking-cli-claude.md`, which asserts the names "must match `getInboxStoplights` in `@shared/status-bar-access`". That source is queued for removal, so the reading is filed here to outlive it. Taken against `~/code`.

Writer: `packages/alanwalton/inbox-tracking/core/src/inbox-tracking/keys.ts` exports `COUNT_ATTR` (`inboxEmail`, `inboxTasks`, `inboxTemperTasks`, `inboxTexts`) and `CLEARED_ATTR` (the four `…ClearedToday` siblings). Its docblock states the contract: "The attribute names here MUST stay identical to the names read in `@shared/status-bar-access/src/inbox-stoplights.ts` — they are the wire contract", and above it, "Kept in a pure package so both the writer ... and the reader (the status-bar access layer) name the same attributes from one source of truth."

Reader: `packages/shared/status-bar-access/src/inbox-stoplights.ts:77` declares a private `COUNT_ATTR` and `:85` a private `CLEARED_ATTR`, the same eight literals typed out again, read at `:196` and `:197`.

No edge between them. `rg -n "inbox-tracking-core"` over `packages/shared/status-bar-access/` exits 1, and that package's `dependencies` names eleven workspace packages, none of them the core. `rg -l "@alanwalton/inbox-tracking-core" --glob 'package.json' packages/` returns two files, both inside `packages/alanwalton/inbox-tracking/`.

Nothing refuses it: `ops enforcement list` reports 232 mechanisms and names none over either package. A rename on one side writes an attribute nobody reads, and the reader's `coerceCount` / `coerceCleared` turn that absence into count 0 and `clearedToday: false` — the blue "empty / cleared" circle, which is the exact lie `poll.ts` goes out of its way to avoid by omitting a failed source rather than recording 0.

All eight literals were compared on 2026-08-08 and they agree. Two prose statements of one contract are one habit written twice.

Not measured: whether the remedy is the missing dependency or a drift check of the `check-widget-bucket-color-mirror` shape.
