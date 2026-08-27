---
id: 5bf7927c-b00f-53a3-a8c2-6b0f0ceaf998
slug: test-only-island-reads-clean
page-type-slug: finding
title: "Test only island reads clean"
domain-slug: domain/global
---

# Claim

`check-ast-unused` cannot see a module that nothing reaches but its own tests, because a test file counts as an entry. A module reports clean while every path into it starts inside the file pair that tests it.

# Evidence

`c685adee78` retired `agent interactive-verdict` and `agent interactive-census` from the code repo, both recorded in the instructions repo's `tools/commands-retired.txt`, with the replacement `instructions turn-end-reading` running wholly in that repo. Twelve files stayed behind in `packages/agents/cli/src/agent/` — six modules, five test files and a corpus JSON — and a grep across both repositories found no reference to any of them from outside that directory.

`check-ast-unused` reported three of the twelve: `DEFAULT_VERDICT_MODEL`, `DEFAULT_TIMEOUT_MS` and `verdictFor` in `interactive-verdict.ts`. The other nine modules were credited as reached. The six exports it did not report — `labelOf`, `NEITHER_EXIT`, `refusalText`, `exitCodeFor`, `readTail`, `evidenceFrom` — are imported by `interactive-verdict.unit.test.ts` and `interactive-verdict.corpus.unit.test.ts` and by nothing else. `verdictFor` was reported only because no test imported it.

So the three it caught are the residue of the case rather than the case: had the retiring commit left the verb's own test importing `verdictFor` too, the whole island would have reported clean. The run after the deletion reads `13588 module(s) analyzed across 382 workspace(s), 12527 entry file(s), zero unused exports`, which is the same clean verdict it would have given over the island under that variation.

NOT MEASURED: how many other modules in the tree are in this position. I found this one by following a check failure rather than by looking for the shape, and I have not swept for it. Nor have I read `check-ast-unused.ts` to establish whether counting test files as entries is a deliberate choice with a reason behind it or an artifact of how entries are collected — the claim above is about what the instrument reports, not about why.
