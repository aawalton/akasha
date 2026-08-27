---
id: efc67baa-617d-5130-a65b-402897c57033
page-type-slug: finding
title: "Live on unchecked against repo"
domain-slug: domain/global
---

# Claim

A project's `live-on` is never checked against the repository it lands in, and the wrong value silently stops the lead-verification gate asking for a CI verdict at all.

# Evidence

Measured on 2026-08-10 on project #18460, a code-repository change I defined with `live-on: commit`.

The rule is already written and binding. `domains/project-path.md` says a project in the code repo goes live at deploy, that Read-Only Main leaves that repo no route onto main but the queue, and that the commit-track build tasks run neither branch CI nor a deploy. Nothing enforces it. `tools/document/schemas/project.ts` admits `deploy` or `commit` as a bare enum with no reference to where the work lands, and `ops project create` writes the stub with `deploy` and never revisits it.

The consequence is not only a stranded branch, though it is that: only `ops project deploy` inserts a merge-queue entry, so a code-repo row marked `commit` has no route onto main.

The consequence that leaves no trace is at the gate. `ops project move-to --status awaiting_lead_verification` demands a green full terminal CI verdict at the pushed SHA — except for a row whose document declares `live-on: commit`, which by its own words "is asked for no verdict at all", the reasoning being that a commit-track row's commits are not in the code repository and the demand would be unsatisfiable by construction. That reasoning is sound for a row where the value is right. Where the value is wrong it withdraws the gate from a row that could have satisfied it. #18460 passed that gate holding a green 97-step branch pipeline the delivering seat had volunteered; nothing asked for one, and a seat that had run none would have passed identically.

So the failure is silent in both directions: the lead who set the value gets no signal, and the gate that would have caught a missing verdict is the thing the value switched off.

What is NOT claimed: that any project has reached done without CI. That was not measured. This is about what the gate can see.
