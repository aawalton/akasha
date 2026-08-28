---
id: 1bb30c6b-ee4b-5dbc-a195-f222a3da27a4
page-type-slug: finding
slug: a-merged-capture-puts-a-partial-figure-next-to-the-verdict
title: "A merged capture puts a partial figure next to the verdict"
domain-slug: domain/instrument-answer
---

# Claim

`ops tests run` writes its per-process transcript to stderr and only its verdict to stdout, so a partial per-process figure and the true total are never on one stream. A capture merging the two puts them adjacent, and a `tail` over that merge keeps a partial figure standing one line above the verdict, where it reads as the answer. Taking the verdict off stdout alone is a different invocation rather than more care, and nothing states it anywhere.

# Evidence

Read and run 2026-08-28.

`tools/commands/tests/run.ts:104` collects each group's raw bun output into a transcript, and `:108-110` writes the whole of it to stderr. Only `:112`, `emitVerdict`, reaches stdout. `emitVerdict` at `tools/lib/verdict-channel.ts:57-61` writes each finding line to stderr and then the verdict line to stdout, so the verdict is written last and on its own stream.

The verdict carries the whole denominator. `verdictHeadline` at `verdict-channel.ts:44` ends every verdict `[over ${renderCoverage(...)}]`, and `tools/lib/run-named-suites.ts:106-108` fills that coverage with `groups.reduce((sum, g) => sum + (g.filesRan ?? 0), 0)` over the unit `test files` — the sum across every process, not one of them.

Run here: `ops tests run tools/tests/bash-env-inside.test.ts 2>/dev/null` answers `VERDICT: PASS — the-named-test-suites: bun exited 0 [over 1 test files (denominator not computed)]` and nothing else. Bun's own summary does not appear on stdout at all.

The incident this bears on is recorded as a specimen on `pages/finding/checks-system/the-rule-caught-the-people-writing-it.finding.md`: two processes answered `Ran 240 tests across 20 files` and `Ran 150 tests across 16 files`, the verdict read `[over 36 test files]`, and what was quoted was 16.

WHAT IS INFERRED RATHER THAN SEEN. The original capture was not found and cannot be re-taken. That it merged the streams is inferred from two things that leave no other invocation open. Piping stdout alone cuts nothing, because stdout is a single line, so a `tail` over it would have kept the verdict and lost none of bun's output — which is not what happened. And under a merge the order is fixed, the transcript being written before the verdict, so a `tail` keeps the end: the second process's summary and the verdict beneath it. That is the state the specimen describes.

This does not move that specimen's mechanism, which is that a correct adjacent summary was read past. It names where the adjacency came from: the instrument did not put those two figures together, and a capture did.

Not measured: whether any other `ops` command separates its transcript from its verdict the same way, so whether `2>/dev/null` is a general route or one command's habit. Not measured: what `(denominator not computed)` means on a single-file run, which may be a second gap in the same line and is not this claim.
