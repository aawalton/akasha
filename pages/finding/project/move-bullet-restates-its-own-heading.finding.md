---
id: 5c9cb1b6-3669-545b-9d7c-d75bd54b4061
page-type-slug: finding
title: "Move bullet restates its own heading"
domain-slug: barred-meaning/project
---

# Claim

The `Move` bullet restates in prose the status its own stage heading already names in backticks, 32 times across the six build tasks. Collapsing it is one sweep over six files rather than a call inside any one review.

# Evidence

Measured 2026-08-06. Occurrences of "**Move** the project" per file: build-child-commit 3, build-parent-commit 4, build-singleton-commit 4, build-child-deploy 5, build-parent-deploy 8, build-singleton-deploy 8. Total 32 over six documents.

Each sits under a stage heading that already names the same status in backticks — stage 1 is "**`understand`.**" and its first bullet is "**Move** the project: `ops project move-to <seq> --status understand`."

The reading of `build-singleton-deploy.md` raised it, counting 38 across five siblings. My pattern was the literal string above and returned 32 across six; the difference is which string was matched, and it does not change the shape of the observation.

That reading kept all eight in its own document, on the ground that a seat does skip status bookkeeping, and returned the collapse as a sweep rather than making it. Its stated preference was to collapse them to a single line under `# Invariants`.

What the sweep would have to weigh, and no instrument settles: the bullet is not pure restatement. It names the verb and its flags, which the heading does not, so collapsing to one invariant moves the command out of the place a seat reads it and into a section read once at the top.

Distinct from `pages/finding/project/six-build-tasks-share-one-procedure.finding.md`, which measures the same family for text duplicated ACROSS documents. This one is about text duplicated WITHIN each document, against its own heading, and the two remedies pull in opposite directions: hoisting to `domains/project.md` versus collapsing into each file's own Invariants.
