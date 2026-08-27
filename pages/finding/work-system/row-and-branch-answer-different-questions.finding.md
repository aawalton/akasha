---
id: 3bb8ec5b-2f3b-56c2-adf6-64114d689e79
slug: row-and-branch-answer-different-questions
page-type-slug: finding
title: "Row and branch answer different questions"
domain-slug: domain/work-system
---

# Claim

When a project's commits ride a sibling project's branch, "which row owns this work" and "which branch carries it" have different answers, and no tool makes a reader state which one they are asking. Every query keyed to one reads as authoritative about the other.

# Evidence

On 2026-08-17, #19376's work landed as `86a9fe7` and `e0042ec` pushed on `project-19357`, riding one CI run with #19357's own three commits. `git branch -r --contains` puts both on `origin/project-19357` and nowhere else. #19376's own document records this outright.

It caused two separate confusions the same evening, at opposite ends of the same fault.

`ops pipeline list --branch project-19376` returned nothing. Read plainly, that says no CI has ever run for the project, and the code-harness lead nearly concluded the row was stalled. The truth was that its commits were on another project's branch.

Hours later, two accounts of the same deadlock disagreed on which project held one end of it: one named #19376, the other named `project-19357`. Both were correct and neither could see it, because one was naming a row and the other a branch. Reconciling them cost a round trip between two leads.

Nothing in either reading was wrong. What is missing is any surface that says which of the two it is keyed to, so a zero from a branch-keyed query is indistinguishable from a row that has done nothing.
