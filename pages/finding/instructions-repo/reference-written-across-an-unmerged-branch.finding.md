---
id: 30b4a0f9-1db0-53b0-b231-6ff62cfed5a7
page-type-slug: finding
title: "Reference written across an unmerged branch"
domain-slug: repo/instructions-repo
---

# Claim

A reference from the instructions repository into a code-repo path that exists only on an unmerged branch is correct in the worktree that wrote it and broken in every other, because `ops` resolves the code root against the live checkout.

# Evidence

`tools/commands/project/statuses.ts` named `packages/alanwalton/projects/cli/src/project/statuses.ts` and loaded it through `codeModule`. `ops project statuses` failed at exit 70, `Cannot find module`. The verb was live-broken for every agent on this workstation.

The path was not a reference that rotted, and not one that was never right. The file existed under exactly that name — 266 lines plus a unit test — added by code-repo commit `fe8ab1f130` at 2026-08-13 23:50:29. `git branch --contains` places it on `project-18916` alone. It is absent from code `HEAD` and was never deleted; it never merged.

The instructions-repo commit naming it, `4d04edf5d`, landed at 2026-08-13 23:51:29 — sixty seconds later. The reference was written against a branch checkout live in the author's worktree and nowhere else. `ops` resolves the code root against the live checkout, which stands on the main line, so the reference resolved for its author and for nobody else.

This is a third category beside the two anybody looks for. A rotted reference has a removal behind it and a wrong one has a typo; both are found by asking what happened to the file. Here nothing happened to the file. The question that finds it is which branches contain it, and nothing prompts that question, because the file is present and readable in the worktree where the doubt would arise.

The instructions repository is live on commit and the code repository lands through branches and CI, so the two are on different clocks by design. Any instructions-repo reference written while a code-repo branch is checked out inherits that branch's state without saying so, and every agent working a code-repo project has such a checkout.

`code-paths-resolve` caught this one within twenty minutes, over 1,119 paths named into the code repository, and it is what makes the class visible at all. It reports the symptom rather than the cause, so a reader meeting it looks for a deletion that never happened.
