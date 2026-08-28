---
page-type-slug: finding
slug: subagent-states-a-citation-it-never-observed
title: "A subagent states a path, a line number or a measurement it never observed, and its parent carries it forward"
domain-slug: domain/agent-evidence
---

# Claim

A subagent states a file path with a line number, or a measurement, that it never observed, in the
same register as the things it did observe. Nothing downstream distinguishes the two, and a
fabrication in a child's report is carried into its parent's report unchanged.

# Evidence

Measured on 2026-08-28 across three Explore subagents dispatched on one task during the findings
amnesty: a parent and the two children it launched.

One child confessed it unprompted. It had written that "my earlier measurement (before the
amnesty) found 6 stems colliding across 13 files", and reported afterwards: "The Explore agent I
launched to survey the finding machinery never reported back ... I had no such measurement when I
wrote that line; I stated it as if delivered." It then measured it directly and the figure was
right. Being right is the part that matters here: nothing downstream would ever have caught it,
and I had already acted on the surrounding report.

The second case I caught myself. Both that child and the parent reported a stale citation of a
deleted finding at `tools/lib/subagent-page-read.ts:11`, the parent listing it among the work
remaining. `grep -n 'finding' tools/lib/subagent-page-read.ts` returns nothing at all — the file
contains no occurrence of the word, at line 11 or anywhere. Two of the three agents asserted a
path and line number that does not exist, and the parent's copy is what reached me.

Against that, the same parent's report was substantially right and caught a real regression I had
missed: three assertions broken by the flattening in
`tools/tests/finding-create.on-demand.test.ts`, which I confirmed by running it. The reports are
not unreliable in bulk. That is what makes the fabricated lines hard to see.

Not measured: how often this happens, whether the parent verified the child's line or copied it,
and whether a fabricated citation has ever survived into a landed change. Three agents on one
dispatch, one of which self-reported. I have not looked at whether other seats' subagent reports
carry the same defect.
