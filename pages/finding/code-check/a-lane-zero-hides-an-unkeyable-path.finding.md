---
id: 06b10430-7ea9-564c-b06e-ce9dc252dc99
slug: a-lane-zero-hides-an-unkeyable-path
page-type-slug: finding
title: "A lane zero hides an unkeyable path"
domain-slug: domain/global
---

# Claim

A typed test lane prints the same line — `0 test file(s) asserted across N of N shard(s)` — whether the reverse-reachability narrowing legitimately reached none of the lane's tests or the changed-files list carried a path spelling the artifact cannot key on. Nothing in the output separates a lane that answered from a lane that missed, so the second reads as the first and the branch goes green.

# Evidence

The lane total is `awk '{ total += $1 }'` over one line per shard, written by `record_asserted_count` at every terminal in `run-workspace-tests.sh`, including the `no test files reached by changed files — skipping` path which records `0`. Read on `project-18682` at `36aa80b5c8`, the commit that added the line. So the figure carries how many files were asserted and how many shards reported, and nothing about why the number is what it is.

That the two cases both arrive at zero was measured by #18626's seat under `bwrap` against the real reverse-reachability artifact rebuilt over that tree, and named by it as a defect it could not separate at this point: the legitimate all-skip and the unkeyable path both produce an empty `SELECTED`. It is decidable where changed files meet artifact keys, which is a different seam from the lane.

Filed as reported for the second half. What is confirmed here by reading the code is the first half: the printed line carries no discriminator, so whatever produced the zero, the reader sees one sentence.

The same seat measured how often the legitimate zero arrives — over the last 200 first-parent commits on main the component lane would have narrowed every shard to zero on 13 — which is why refusing at zero was declined and this was filed instead.
