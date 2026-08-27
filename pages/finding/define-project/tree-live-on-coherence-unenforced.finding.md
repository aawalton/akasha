---
id: 69e1d148-1173-5a71-92ad-c2b3ec13a671
page-type-slug: finding
title: "Tree live on coherence unenforced"
domain-slug: domain/global
---

# Claim

A project tree's `live-on` values must cohere and nothing enforces it. `project-ladders.ts` states that a parent is `commit` only where its own change and every child's are, because a `deploy` child parks at `awaiting_manager_deployment` waiting on a parent deploy a commit parent has no rung for. Nothing in the projects package gates this, and `domains/tasks/lead/define-project.md` sets the parent's value and repeats the stage per child without saying they must agree.

# Evidence

Raised by `claude-define-project-archivist-review-instructions` during a review-instructions reading of `domains/tasks/lead/define-project.md` on 2026-08-09, out of its work on the `live-on` line. It searched the projects package and reports nothing gating the coherence; that search and the `project-ladders.ts` quotation are its readings, relayed rather than re-run by the filing seat.

Its own remedy, offered rather than taken: one clause on the line telling a lead to repeat the stage on every child would cover it. Adding instruction that rests on judgment is what review-instructions sends back rather than writing in.

Not measured by anyone here: how many live trees currently disagree, and whether any is parked on this now.
