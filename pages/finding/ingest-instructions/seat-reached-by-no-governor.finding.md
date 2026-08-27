---
id: 3da44001-ed26-5c49-8159-9640e3c961b0
slug: seat-reached-by-no-governor
page-type-slug: finding
title: "Seat reached by no governor"
domain-slug: domain/global
---

# Claim

An ingest seat is reached by no path-governing document. It only cuts and keeps, so it never triggers `read-what-governs`, and its boot closure walks persona, domain, role and task rather than the set governing a path — so `domains/folders/instructions-repo.md` arrives by neither route. Governed From Here and Recorded Reading bind that seat only where `domains/tasks/archivist/ingest-instructions.md` restates them.

# Evidence

Raised by the dispatched reviewer of `domains/tasks/archivist/ingest-instructions.md` on 2026-08-08 and relayed here unjudged. It reported running `ops instructions governs` on `dirty/rulings/` and on `dirty/maybe-keep/rulings/x.md`, and finding nothing governing either.

This is what its verdict on 3/**Compose** turns on: it kept the `code-path:` clause rather than cutting it under Single Authority, because a restatement is the only route by which that claim reaches the seat at all. Alan landed the clause and the rule together at `5caa4ea1a`.

`quarantined-docs-drift-ungoverned.md` in the `archivist` domain records that quarantined documents go stale in an ungoverned queue. That is about the documents; this is about the seat's reading obligations. Neither subsumes the other.

I did not re-run the two `governs` calls, and I did not trace the boot closure myself.

Not measured: whether any other task document is reached the same way, which would make this a shape rather than one case. The reviewer looked only at its own subject.
