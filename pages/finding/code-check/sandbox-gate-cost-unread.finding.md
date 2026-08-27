---
id: c2bf2b5a-554e-504f-8d37-4e085d9e439a
slug: sandbox-gate-cost-unread
page-type-slug: finding
title: "Sandbox gate cost unread"
domain-slug: domain/global
---

# Claim

What `check-addon-sandbox-safety` costs on real CI has never been read, so the one-pass rewrite's gain is known only from a loaded workstation and the review's 7205ms median stands unretested.

# Evidence

Observed while verifying project #18399, which made the gate's scan one regex pass over each line instead of twelve.

Every cost figure attached to that change was taken on this workstation against a locally built `dist`, under a tree of concurrent sibling agents. Running the two scanner versions in one process over the same 102 emitted bundles — 459,424 lines, 17.1MB — I measured medians of five warm runs at 1626ms for the twelve-pass version and 418ms for the one-pass, a ratio of 3.89x. The delivering seat measured 1109–1396ms against 424–566ms, 2.1x–2.8x, on the same corpus. The two readings agree on direction and disagree on size by more than either's own spread, which is what a loaded workstation would produce and is the reason neither settles what CI will see.

The figure the gate is actually judged against is the 7205ms median recorded in its own review, and that came from the cost store rather than from here. `ops pipeline step-cost --step check-addon-sandbox-safety` after the tree lands is the reading that compares like with like, and #18399's Notes name it as the one thing the deploy is needed for.

Nothing carries that reading. #18399 passes to deployment and the deploy finishes it, so the row closes with the measurement still untaken and no later seat is sent to it.

The same run leaves a second thing unread, recorded here because it bears on what the gate is worth rather than on what it costs: whether this gate has ever refused on CI at all. The cost store reaches 200 runs and five days of a life that began in April, and every run in that window completed.
