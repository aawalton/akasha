---
id: 150a72de-5d88-5e85-a612-d40af0659960
page-type-slug: finding
title: "Track undeclared across lead tasks"
domain-slug: domain/global
---

# Claim

`track` reaches its readers undeclared on exactly two documents, both lead tasks: `domains/tasks/lead/dispatch-project.md` and `domains/tasks/lead/verify-handback.md`. `domains/project-track.md` declares the sense; `ops instructions glossary` reports no drawn-in term on either. On dispatch-project the gap is narrow, the line supplying `singleton` and `parent` inline. On verify-handback it is not: "the status its track names next" has nothing to anchor it.

# Evidence

Raised twice, from two subjects, on 2026-08-07. The `dispatch-project` reading found it and left the scope open as "corpus-wide". The `verify-handback` reading found it independently and measured the scope instead: exactly two documents.

This finding replaces the earlier one filed under this slug, whose claim that the remedy is "corpus-wide" is what the measurement corrected. The earlier text is superseded rather than deleted for being wrong about the defect — the defect is the same, the scope was overstated.

Verified myself: `grep -rln "its track\|the track\|track names" domains/` returns those two files and nothing else. `domains/project-track.md` is live.

The remedy named and not landed: `glossary: [project-track]` on both, which is an Add charging every reader of each document for a whole domain. Small enough to land in a single run once someone settles whether to.

Fourth of five cases this run of a term standing outside its reader's reach; the pattern is filed at `findings/domain/four-terms-out-of-reach`, which was written before this measurement and calls this one corpus-wide.
