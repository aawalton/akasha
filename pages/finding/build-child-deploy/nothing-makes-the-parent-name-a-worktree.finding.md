---
id: 29d7b856-0e83-59de-a87b-e53e2285d1fc
slug: nothing-makes-the-parent-name-a-worktree
page-type-slug: finding
title: "Nothing makes the parent name a worktree"
domain-slug: domain/global
---

# Claim

A child is told to work in "the worktree your parent names", and nothing makes the parent name one. `ops seat start` has no flag for a working directory, so the dispatch prompt is the only channel, and the parent's Dispatch bullet names only the task and the order. A child holding its parent's seq could resolve the path alone, `ops worktree add` being idempotent and returning an existing path — but no line says so.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-child-deploy.md` on 2026-08-07, which found the gap and did not paper over it: writing the fallback in would have been an addition resting on its own judgment.

I did not run `ops seat start --help` or `ops worktree add --help`; both characterisations are the reviewer's.

What makes this worth a lead's attention rather than a reviewer's fix is that the repair could land in either of two documents — a line on the parent's Dispatch bullet telling it to name the worktree, or a line here telling the child how to resolve one — and those are different claims about who owns the fact.
