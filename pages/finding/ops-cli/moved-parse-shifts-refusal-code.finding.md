---
id: d6aaa237-3b28-5c90-8547-a70362cc2daa
slug: moved-parse-shifts-refusal-code
page-type-slug: finding
title: "Moved parse shifts refusal code"
domain-slug: domain/ops-cli
---

# Claim

Moving a verb's parse onto the standing parser changes the exit code its malformed invocations carry, and the help block a move must leave untouched goes on promising the old one.

# Evidence

Measured before and after moving three bodies, each run against the same live tree:

`ops check-enricher-barrel --bogus` printed `[enricher-barrel] unknown argument: --bogus` and exited 2; it now prints `unknown flag: --bogus` and exits 1. `ops check-producer-barrel --bogus` and `ops lint-verdict --bogus` moved the same way, as did `ops check-enricher-barrel stray-positional`, which exited 2 and now exits 1 as `unexpected positional argument(s)`.

All three declare their exit codes in the `description` a move is required to carry over verbatim, and each of those blocks still reads `2  tool / input error`. The moved bodies therefore print help that names an exit code they no longer produce for a caller's typo, and the help is the half a mover may not touch.

The cause is not incidental to these three. `@infra/checks/cli-args` refuses through the body, which reaches `exitOnToolError` and its exit 2; `@shared/cli-core/parse-args` refuses through `InputError`, which `exitCodeForThrowable` classifies as 1. Every verb whose pre-move body parsed through the first and whose help states an exit-code table crosses the same gap on the way here.

`ops deletion-residue x --bogus` crossed it the other way and improved: it exited 70 before, as an unclassified `Error` from `cli-args` reaching the dispatcher as an unhandled defect, and exits 1 now.

Every well-formed invocation of all four verbs was byte-identical across the move, on stdout, stderr and exit code. The drift is confined to what the parser refuses.
