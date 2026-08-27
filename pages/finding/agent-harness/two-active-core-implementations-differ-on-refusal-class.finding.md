---
id: 049f1b2e-46b2-5e7d-807d-67f5c144656e
slug: two-active-core-implementations-differ-on-refusal-class
page-type-slug: finding
title: "Two active core implementations differ on refusal class"
domain-slug: domain/agent-harness
---

# Claim

Two different `active-core` implementations stand under three spellings, and the one in this repository reports a caller's bad flag as an unhandled defect.

# Evidence

Verified on the live tree, 2026-08-13.

Two files named `active-core`, with different contents:

- `tools/lib/active-core.ts` — 12,316 bytes, 12 exports, landed 14:00 today.
- `packages/agents/cli/src/agent/active-core.ts` in the code repository — 5,461 bytes, 8 exports.

They are reached from here under three spellings that do not say which is meant. `@agents/cli/agent/active-core` (4 sites) and `packages/agents/cli/src/agent/active-core.ts` (2 sites) reach the code repository's; `../lib/active-core.ts`, `../../lib/active-core.ts` and `./active-core.ts` reach the local one.

The difference that matters is the refusal class. The code repository's file imports the real `InputError` from `@shared/cli-core/exit`. The local file HAND-ROLLS its own — its own comment says so, noting it duck-types the two fields it believed anything reads: `name` of "InputError" and `code` of 1.

`exitCodeForThrowable` classifies by `instanceof`, in four arms reading no field, and anything it cannot place exits 70. A duck-typed error is therefore not recognised: a verb reaching the local implementation reports a caller's bad flag at exit 70, where the same mistake against the code repository's exits 1.

flex-54 met this wiring a since-retired census command, whose body already stood here from an earlier native port. Every census refusal exited 70. It bridged the class at the dispatch boundary rather than repairing it, preserving the pre-move exit code.

`ops seat active` and `ops seat revive` reach the same module and have not been examined.

Not repaired: consolidating is a horizontal change across many landed verbs and wants its own run, and changing what a verb exits is a surface change standing with the six-namespace exit-70 class already awaiting a ruling.

The duck-typing is the part worth carrying. It was written to satisfy a classifier that reads fields, against one that reads types, and neither file alone shows it.
