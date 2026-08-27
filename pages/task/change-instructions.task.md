---
id: d2d03739-8e8d-50b6-aadb-101409862057
page-type-slug: task
title: "Change instructions"
slug: change-instructions
domain-parent-slug: page-type/task
---

# Definition

- **Change instructions** — making a change to the instructions repo without an initiative.

# Sequence

1. **Whether it needs an initiative.**
   - **Create** an initiative instead where any part of the change reaches the code repository, needs a definition somebody else writes, or needs a verdict from a seat that did not make the change. The first of those depends on whether something has to reach production over a branch, CI and a deploy, not on whether the change touches code — this repo's own `tools/` are code and land on the commit like everything else here.

2. **Verification.**
   - **Run** `ops instructions run-checks`, because there is no branch, no CI and no deploy on this path.
