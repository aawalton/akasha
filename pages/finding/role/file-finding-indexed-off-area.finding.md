---
id: 3d897101-ab1c-5247-884d-be82d64b7590
page-type-slug: finding
title: "File finding indexed off area"
domain-slug: page-type/role
---

# Claim

`file-finding` is indexed only from `lead`, though it sits in the area `role` claims and its trigger as written applies to any role. `role`'s own Tasks section carries one entry, and it is not this.

# Evidence

`domains/tasks/general/file-finding.md` sits under `domains/tasks/general/`, which `domains/role.md` claims outright by `instructions-path: domains/tasks/general/*.md`.

Its trigger as written reaches any role — "your own domain or anyone's".

`rg -ln "file-finding" domains/` returns three files: `domains/roles/lead.md`, the task's own document, and `domains/tasks/archivist/ingest-instructions.md`, where it is cited in passing rather than indexed. `domains/role.md`'s Tasks section carries one entry, `loop`.

This is not a Single Authority breach — the task is indexed once, and stands once. What is open is only which surface should carry the index, and no instrument settles it.

Raised by the `review-instructions` reading of `domains/roles/lead.md` on 2026-08-05.
