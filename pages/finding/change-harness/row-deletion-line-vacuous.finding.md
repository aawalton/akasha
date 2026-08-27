---
id: 770893d7-35be-574a-8eea-d2c091e78ed2
page-type-slug: finding
title: "Every page type under change-harness is already file-backed, so the row-deletion line guards nothing"
domain-slug: domain/change-harness
---

# Claim

The Design line "A page type under this domain has its rows deleted rather than carried into files" guards nothing today. All three page types under this tree — `refusal`, `merge-queue`, `pipeline` — are already file-backed: `ops page list` answers each through `getFilePages`, over 218 files at `refusals/`, one `merge-queue-current.md`, two under `memory:pipelines/`. `git show 06c7e7337` shows the line landed 2026-08-19, the day the last of them moved.

# Evidence

Read off the `review-instructions` reading of `domains/change-harness.md` finished 2026-08-21, read line by line, bottom to top. The reading kept the line: it is a real departure, `global.md` "File First" reading as carrying the rows across, and nothing else in the corpus states it. What it reports is that the departure has no live population — the line now reaches only a page type not yet here.

Not measured here: I did not run `ops page list` or the git show, and I did not check whether a fourth page type is on its way under this tree.
