---
id: 8ea69bda-c8f4-5caa-b0f8-49c929f83893
page-type-slug: finding
title: "Test at its own timeout reads as a failure"
domain-slug: domain/global
---

# Claim

`tools/tests/read-seat-name.test.ts` takes about as long to run as the bound it is given, so it fails whenever the machine is busy: alone it passes in 5.46s, against a 5000ms per-test timeout.

What makes it worth more than a slow test is what the failure says. The case is named for two seats spelling one name having to resolve to one, so a timeout is reported in the words of a correctness claim, and a reader meeting it in a suite summary reads a collision that is not there.

# Evidence

`bun test tools/` during active fleet work: 1 failing test, `^ this test timed out after 5000ms`, no assertion reported. `bun test tools/tests/read-seat-name.test.ts` immediately after, alone: 17 pass, 0 fail, 5.46s for the file.

The overnight seat holding `pages-in-files` reported the same suite at 6184 pass / 0 fail earlier tonight, which is consistent with the test passing when it is not contended rather than with anything having broken since.

I contributed to the load I measured under: I ran the suite while that seat and its delegates were working. A finding already filed under `tests` records the sibling case, where two `bun test` runs share one fixture path and delete each other's files.

Not measured: how close to the bound the file runs on an idle machine over repeated runs, which of its 17 cases carries the time, and whether any other test in the tree sits at its own ceiling the same way. One timing sample, taken once.
