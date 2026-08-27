---
id: e8708de4-da99-5da2-a325-b0bb2ac87e1b
page-type-slug: finding
title: "Prefix hole names no repository"
domain-slug: page-type/refusal
---

# Claim

`refusals/prompt-prefix-undefined.md` serves two arms in two repositories and nothing in it says which repository its path hole names. On the canonical arm it renders a `packages/agents/shared/` path that does not exist in the instructions repo, so an agent stopped by it searches the tree it stands in and finds nothing. Its sibling `prompt-prefix-disagrees` says "where this repository declares", inviting exactly the wrong reading.

# Evidence

Raised by the dispatched `review-instructions` seat reading the document on 2026-08-12, which rendered both arms through the printer with the values each produces.

It could not land a fix: no wording in this document can know which repository the hole names, and the change is at the check's two call sites, which also moves what the sibling prints. The check's header argues for one body serving both deliberately, on the ground that it keeps them comparable. `halt-reader-without-vocabulary` shows the shape a fix would take, spelling the repository into the sentence.

A reading of `refusals/project-status-unprojected.md` the same day met the same class of fault and could repair it, that body having one arm.

Not measured: how many other refusal bodies carry a hole that fills from the code checkout.
