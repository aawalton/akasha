---
id: 85c7bd41-40e0-5672-bd27-8d9aad71d774
slug: moved-domain-disarms-hold-seat
page-type-slug: finding
title: "A moved domain disarms hold seat rather than refusing"
domain-slug: domain/agent-harness
---

# Claim

When a domain document moves or its page type is renamed, a seat standing on that domain keeps stating the old paths, and the `hold-seat` gate then reports `unresolvable` rather than refusing. The guarantee goes absent for that seat instead of stopping it, so the seat keeps writing with no governing-document enforcement and nothing but a passing line on an unrelated write says so.

# Evidence

Read on 2026-08-17 by the seat dispatched onto #19357, domain `page-query-service`. A memory write printed:

`[hold-seat] not-applicable — this seat states 4 attribute(s) and 2 of the document(s) they name are no longer there (domains/systemd-service.md (domain page-query-service); domains/page-query-service.md (domain page-query-service)) — nothing this agent may do while refused would restore them, so THIS GUARANTEE IS ABSENT for it until they are stated again`

The same branch stands today, spelled `unresolvable`. `tools/lib/hold-seat.ts:175-181` returns that kind with an empty `refusals` list whenever a stated document's file is gone, `refuses()` at line 39 is false on an empty list, and `stoodAside()` at line 43 names `unresolvable` among the kinds that stand aside. The detail still ends "THIS GUARANTEE IS ABSENT for it until they are stated again with `ops seat set`".

The cause was two instructions commits that landed while the seat worked: `systemd-service` was renamed to the `workstation-service` page type, and `domains/page-query-service.md` moved to `domains/services/page-query-service.md`. The seat had stated its attributes before either landed.

Re-stating the same four attributes with `bun tools/seat.ts --persona claude --domain page-query-service --role developer --task build-singleton-deploy` re-resolved both paths, and `--show` then listed `domains/services/page-query-service.md` and `page-types/workstation-service.md`. Nothing else was changed to achieve that.

The word is what makes this quiet: every other line in the gate block reads `pass` or `fail`, and a guarantee that has gone absent prints in the same column as one that never applied.

Not measured here: how long the guarantee stood absent, whether any write landed while it was, how many other seats stand on a domain that moved today, or whether anything reports this other than in passing on a write that happened to run the gate block. Akasha is live on commit and a seat states its attributes once, so the two can drift for any seat, not only this one.
