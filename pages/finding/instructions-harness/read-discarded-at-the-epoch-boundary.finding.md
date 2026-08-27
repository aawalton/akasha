---
id: 97c2b35e-bb1f-5ed9-8c4d-fc9a8e3b1bca
page-type-slug: finding
title: "Read discarded at the epoch boundary"
domain-slug: domain/global
---

# Claim

A read taken shortly before a context replacement is discarded by the epoch filter, so a surface read in full, whole and blob-matching, reads to every gate as never read at all — and re-reading it inside the same window does not clear it.

# Evidence

Measured 2026-08-04 by this lead, resuming after a compaction. `domains/instructions-harness.md` was read whole through `bun tools/read.ts`; the record at `~/.instruction-reads/<agent>.json` held it with spans `[[1,30]]` and blob `f28c681b`, matching `git hash-object` exactly. `read-what-governs` refused an edit naming that file as NOT YET READ, and `read.ts` itself reported "nothing on record says you have read it" on a second read of the same file.

`read-log.ts`'s `vouched` keeps an entry only where `entry.seen >= replacedAt(agent)`. `recordRead` sets `seen` to the clock at each read, so the filter is doing what it says. What makes it visible is ordering: five surfaces read seconds later cleared the same gate, and the one read first did not, because the epoch was stamped between them.

Two turns were spent re-reading a file already read in full. The reader has no way to tell this state from a genuine gap: the refusal's wording is identical, and the remedy it names is the one that was just performed.
