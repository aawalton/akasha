---
id: cba8e3fa-a31f-5f3f-b05c-1ad73014d3cb
slug: corpus-counts-depend-on-the-grep
page-type-slug: finding
title: "Corpus counts depend on the grep"
domain-slug: domain/agent-harness
---

# Claim

Two seats counting the same population off the transcript corpus on the same day agreed on the denominator and disagreed twenty-fold on the subset, and neither figure was wrong by its own method.

# Evidence

On 2026-08-04 two independent measurements were taken of how often `tools/read.ts` had been invoked through a pipe.

The delivering seat on #17812 measured `~/.claude/projects` and reported 502,394 Bash command strings, 7,784 read-door invocations of which 6,442 distinct, 228 carrying a pipe on the invocation, 151 of those merging stderr.

The verifying lead measured `~/.claude/accounts/aawalton/projects` and got 2,079,595 command strings and 8,056 read-door invocations — close on invocations, four times the denominator — then 4,223 piped rather than 228.

The gap is boundary handling in the capture, not the corpus. A tail pattern stopping at `;` and `&&` still runs past a single `|` into whatever follows it, so a compound command counts as piped wherever any later segment carries one. A pattern stopping at `&` instead truncates before `2>&1` and reports zero stderr merges — which the lead also produced, on the way. Three patterns, three answers, no error message from any of them.

An earlier figure from the same lead — 6,222 invocations, 1,135 piped, 174 into `head` — was taken by grepping raw JSONL rather than parsed command strings, so it counted prose and tool-result bodies quoting the command alongside the command. It was reported to Alan before it was checked.

What makes this worth filing rather than correcting in place: several rows this week carry corpus figures taken this way, and a count reads identically whether its pattern held or slipped.
