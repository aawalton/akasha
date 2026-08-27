---
id: 0a21b254-7cb6-518e-ba31-f7f7bdcb6c8d
page-type-slug: finding
title: "Tracking argv entry points outlive their commands"
domain-slug: domain/ops-cli
---

# Claim

`packages/alanwalton/daily-tracking-cli/src/delete.ts` and `safety.ts` each still carry a default export that parses argv against a `CommandHelp`, and nothing but their own unit tests calls it. The live commands `ops tracking delete` and `ops tracking safety` parse in the instructions repository and reach these files by path for the named pure functions `buildDeleteEcho` and `planSafetySplit`, never for the argv entry point.

# Evidence

Read on 2026-08-16 against `origin/main` at `c1235611a8`.

`delete.ts:60` and `safety.ts:108` both declare `export default async function …Command(args: readonly string[])`. They are two of the three code-repository files `command-help-bound` still counts as declaring a `CommandHelp`; the check reports them bound rather than drifted, so they spell the same flags the instructions repository does and nothing there is wrong today.

The callers are `tools/commands/tracking/delete.ts:60`, which takes `buildDeleteEcho`, and `tools/commands/tracking/safety.ts:80`, which takes `planSafetySplit`. Both reaches are by file path through `codeModule`, which never consults the package's `exports` map — the reason #19088 deleted these two files as dead and had to restore them at `81ed850cd477`.

The only calls on the argv entry point are `delete.unit.test.ts:45`, `safety.unit.test.ts:81`, `:85` and `:89`, each passing an array literal to assert an `InputError`.

Observed while verifying #19088, whose two criteria this does not breach: the criterion about callers was settled over the callers, and a unit test calling its own file's entry point is not a command surface the row was asked to move.
