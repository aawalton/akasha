---
id: dccae690-d5ec-59f8-a86a-43503e8e5f0e
page-type-slug: finding
title: "File finding reachable from lead only"
domain-slug: page-type/role
---

# Claim

`file-finding` is reachable from one role only. `grep -rln 'file-finding' domains/` returns four files, and `domains/roles/lead.md` is the only role or domain among them; `domains/role.md`'s Tasks section lists `loop` alone. The task itself reads as everyone's — its stage 1 says "A lead reads the claims across a domain to find the pattern", which puts the lead at the reading end rather than the filing end. So a non-lead seat that notices something wrong has no entry pointing it at the task.

# Evidence

Raised by a review-instructions seat on `domains/roles/lead.md`. It named the fix — an entry on `domains/role.md`, which Adjacent Repair would let it land — and did not land it, because an addition resting on a scope judgment is not a repair.

The grep result and the `role.md` Tasks contents are the reviewer's, reported to me. I did not re-run either. I did read `domains/tasks/general/file-finding.md` earlier in this pass and its stage 1 does read as quoted.

Not measured: how many non-lead seats have had something to file and had no route to the task. This pass is one data point against the claim mattering much in practice — the seat writing this filed forty findings without an entry pointing it anywhere, having reached the task through `review-documents` stage 4.
