---
id: d2743e29-3e00-507d-b2bc-c7d18decf50a
slug: retired-word-verb-stands-in-270-places
page-type-slug: finding
title: "The retired word verb stands in 270 places"
domain-slug: domain/global
---

# Claim

`verb` is a retired word — `pages/barred-meaning/verb.barred-meaning.md` says it means an `ops` subcommand and is now written as command — and it stands in 270 places across `tools/`, so the `words-read` gate charges a reading for it on every write that touches one.

# Evidence

Measured 2026-08-19, while moving the seat control channel off the agent row.

The gate refused a write to `tools/lib/seat-action.ts` for `Verb`, which appears there as `export type AckVerb = "compact" | "restart" | "reset" | "proxy-swap"` and as the `verb` parameter of `describeAckTimeout`. Those four values are `ops` subcommands, so the retired sense is the one meant.

`grep -rn "\bverb\b\|Verb" tools/ --include=*.ts` counts 270. The uses are not one cluster: `tools/ops/` dispatch and its tests speak of "finding the verb" and "a namespace with no verb after it"; the turn-end machinery carries a `verb-unavailable` reason across `turn-end-decide-interactive`, `turn-end-decide-unattended`, `turn-end-format` and `turn-end-record`, and the hook tests `block-headless-halt` and `block-interactive-stall` assert that string; seven `ops-temper-*-help` tests parameterise over `verb`. Several are test assertions on literal strings, so a rename changes what is asserted rather than only what it is called.

Renaming one corner makes it worse rather than better: Ubiquitous Naming holds that a name moved in one layer and not the rest is two names, and 269 uses would go on saying `verb` while one said command. That is why the `AckVerb` occurrence was read and left rather than renamed alongside `clearRequestedActionRow`, which was renamed at `f63c700` because it named a row that no longer exists.

Not measured: whether `verb-unavailable` reaches any stored row, log line or page property whose value a rename would also have to migrate; only the TypeScript occurrences were counted. The code repository was not searched.
