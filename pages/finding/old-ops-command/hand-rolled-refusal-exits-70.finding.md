---
id: 52eb2cb6-8f6b-55b0-a102-daa6479665e5
slug: hand-rolled-refusal-exits-70
page-type-slug: finding
title: "Hand rolled refusal exits 70"
domain-slug: page-type/old-ops-command
---

# Claim

`tools/lib/active-core.ts` exports a hand-rolled `InputError`, and a refusal raised through it exits 70 rather than 1. The dispatcher classifies through `@shared/cli-core/exit`'s four `instanceof` arms, which read no field, so a class merely spelling `name` and `code` the same way is unclassified and reports a caller's typo as an unhandled defect. `parseWindowDuration` raises it on every malformed duration. Any verb reaching it, and not bridging at its own boundary, refuses with the wrong code.

# Evidence

Found while wiring a since-retired census command to a native port in this repository. Before a bridge was added, all five of its refusal paths were identical to the code repository's on stdout and stderr and exited 70 where the code repository exits 1. Bridging at the dispatch boundary and nowhere else made all twelve of its refusal paths match on all three streams.

The class: `InputError` in `tools/lib/active-core.ts`, whose own header says it carries "the two fields anything reads", `name` and `code`. Those are the two fields `exitCodeForThrowable` never looks at — as `tools/lib/code-errors.ts`'s header already states in full, for exactly this reason.

Two landed verbs reach that module's `parseWindowDuration` and were not examined for this: `tools/commands/seat/active.ts` and `tools/commands/seat/revive.ts`, both spelling it `../../lib/active-core.ts`. Whether either can be given a malformed duration that reaches the raise was not measured here.

Re-measured 2026-08-27 in akasha. The hand-rolled class stands at `tools/lib/active-core.ts:4`, carrying `code = 1` and `name = "InputError"` — the two fields the classifier never reads — and `parseWindowDuration` raises it at :19. The classifier moved to `shared/errors-core/src/exit.ts`: `isCliError` at :53 is four `instanceof` arms and `exitCodeForThrowable` at :62 returns `EXIT.UNCLASSIFIED`, which is 70, for anything they miss. So a refusal through this class still exits 70. The callers have changed: `tools/commands/seat/active.ts` and `tools/commands/seat/revive.ts` are gone, and the module is now reached from `tools/commands/ask-alan.ts`, `tools/commands/seat/resume.ts`, `tools/lib/ask-alan.ts` and `tools/lib/command-args.ts`.

Distinct from the code repository's own copy at `packages/agents/cli/src/agent/active-core.ts`, which raises `@shared/cli-core/exit`'s `InputError` and exits 1. Verbs reaching that copy by `codeModule` are unaffected: `ops seat exits --since 24x` and `ops seat observations --since 7q` were each proved to exit 1 on both sides of their own move.

A third spelling of the same capability stands at `@agents/cli/agent/active-core`, used by eight landed verbs. The three spellings resolve to two different implementations whose refusals exit differently, and nothing at a call site says which one it reached.

The code repository was absorbed into akasha, and with it both of those other spellings: `tools/lib/active-core.ts` is the only one left. What that removes is the comparison, not the fault — the surviving implementation is the one that exits 70.
