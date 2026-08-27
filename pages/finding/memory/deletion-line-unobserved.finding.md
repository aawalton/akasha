---
id: 83305d46-bb8a-543d-be5b-4d5fda3a9b0a
slug: deletion-line-unobserved
page-type-slug: finding
title: "Deletion line unobserved"
domain-slug: domain/global
---

# Claim

`memory` says a memory document is deleted when its purpose is complete, and `project` inherits it. The estate does not do this: finished projects keep their files, and nothing marks whether that is the rule being broken or the rule being too broad.

# Evidence

`domains/memory.md` Design: "A memory document is deleted when its purpose is complete." `domains/project.md` declares `domain-parents: memory`, so it inherits the line.

`~/memory/projects/` holds 109 files. Four were sampled and each reports `status done` through `ops project show <seq> --properties status` with its document still standing: 17531, 17563, 17593, 17594. Verified independently by the archivist filing this, re-running the same reads.

Two readings, and nothing distinguishes them:

- The line is right and the estate is out of compliance, in which case 109 files are candidates for deletion.
- `project` owes an Absence saying a project's file stands after the work is done, and the line on `memory` is over-broad.

`domains/finding.md` states its own deletion criterion explicitly — "A finding is deleted when a decision is made about it or when its claim stops being true" — so the family already varies on this point rather than taking the parent's line uniformly.

This is a decision about the whole memory family rather than about one document.

Raised by the `review-instructions` reading of `domains/project.md` on 2026-08-05, as something no slice of that document could reach.
