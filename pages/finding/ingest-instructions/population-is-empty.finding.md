---
id: c8afaea7-2b53-59a4-a60d-d8aa10e20c90
page-type-slug: finding
title: "Population is empty"
domain-slug: domain/global
---

# Claim

The population `ingest-instructions` works on is empty, and it was emptied on a judgment that the practice was not worth doing.

# Evidence

Reported by the review of `domains/tasks/archivist/ingest-instructions.md` on 2026-08-16: `git ls-files dirty` returns nothing, and commit e4992998f of 2026-08-09 removed the whole shelf with the message "remove the quarantine shelf whole — rebuilding beats panning, per Alan 2026-08-09" — one day after that document's previous review record. The reviewer reports nothing in the task is false: `dirty/` is still a live address in owns-path.ts, unreached.ts, rm.ts, mv-help.ts, rename.ts and replace-help.ts, so a source dropped there tomorrow would be ingested as written. What is gone is the stock. Whether the task still earns its place is the same call that emptied it, and was not judged. Not re-checked here.
