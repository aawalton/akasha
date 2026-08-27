---
id: b521321f-cc19-5e39-a85e-492213c72fbb
slug: glob-reaches-two-taskonly-files
page-type-slug: finding
title: "Glob reaches two taskonly files"
domain-slug: page-type/role
---

# Claim

The `instructions-path` on `domains/role.md` governs three files where only one declares a role edge. It reads `domains/tasks/general/*.md`, which reaches `loop.md`, `define-task.md` and `file-finding.md`. Only `loop.md` declares a `role` edge; the other two declare `task` alone. Path Globs warns that a domain then answers for files nobody looked at.

# Evidence

Raised by a review-instructions seat on `domains/role.md`, which reported a real case each way and nothing instrumental to settle it, so it returned rather than narrowed.

The reviewer reported running `ops instructions governs` on all three files under `domains/tasks/general/`. I did not re-run it and did not read the three documents' frontmatter myself.

Not measured: whether the two task documents lacking a role edge are in fact outside the role domain's area, or whether the edge is what is missing rather than the glob being too wide.
