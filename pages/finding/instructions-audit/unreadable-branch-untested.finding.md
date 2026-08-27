---
id: a42af974-a433-51fc-8aef-c9becaff91e0
slug: unreadable-branch-untested
page-type-slug: finding
title: "Unreadable branch untested"
domain-slug: domain/global
---

# Claim

Nothing tests the branch `refusals/statusline-side-unreadable.md` is printed on. `tools/tests/statusline-constants.test.ts` holds six cases and none makes a file unreadable, so the only body this document is ever printed as is uncovered — which is how a false authority claim in it stood until 2026-08-12. The suite's last case does pin the sibling body.

# Evidence

Found by the dispatched `review-instructions` seat reading the document on 2026-08-12, which had to render the body with a throwaway probe — the real check handed a repo view whose read throws for one path at a time — because no test reaches it. That probe was scratch and died with the seat.

The fork: add a seventh case pinning this body, as the last case pins the sibling, or leave it re-probed by hand at each reading.

Not measured: how many other refusal bodies are printed on branches no test reaches.
