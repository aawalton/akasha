---
id: 47e0971b-ac4c-555f-af8b-997f217d56ff
slug: monarch-pages-fully-in-files
page-type-slug: finding
title: "Every monarch page stands in a file across all six types, so that Intent entry should leave outright"
domain-slug: domain/monarch
---

# Claim

"Every monarch page stands in a file" is now true and should leave Intent outright. All six monarch page types hold zero live rows, no live page-type row names any of them, and every population answers from files through the query path — 11,097 pages in total. The other three entries I did not measure. One is worth flagging rather than resolving: the split it describes, memory for what a schedule writes and instructions for what names it, matches where the six types sit. That entry stands at `pages/domain/monarch.domain.md:31` and names two repositories that no longer exist, so it wants a ruling of its own rather than the same one.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN with psql and against the page query service.

Rows: monarch-account, monarch-category, monarch-tag, monarch-holding, monarch-month and monarch-transaction each return 0 from `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null`, and no `page-type` row exists for any of the six, live or soft-deleted. At 14:58:45Z the whole `pages` table held 41 live rows across `property-definition` and `page-type` alone.

Files, counted through the read path rather than off disk: monarch-account 31, monarch-category 54, monarch-tag 1, monarch-holding 3, monarch-month 62, monarch-transaction 10,946. Total 11,097.

Where each stands: monarch-account at `instructions:domains/monarch-accounts/*.md`, monarch-category at `instructions:domains/monarch-categories/*.md`, monarch-tag at `instructions:domains/monarch-tags/*.md`, monarch-holding at `memory:monarch/holdings/*.md`, monarch-month at `memory:monarch/months/*.md`, and monarch-transaction at `files: none` — its 10,946 pages stand in `data: jsonl` sidecars beside the 62 months, declared by `properties/monarch-month-transactions.md`.

Both those roots were absorbed into akasha, and the shape survived the move. Counted over tracked files on 2026-08-27: monarch-account 31, monarch-category 54, monarch-tag 2, monarch-holding 3, monarch-month 62, and monarch-transaction still no `.md` of its own — its pages stand in the 62 jsonl sidecars beside the months. The Intent entry this asks to remove is `pages/domain/monarch.domain.md:29`, still reading "Every monarch page stands in a file."

That layout is what makes the third entry worth a second look: the three naming tables are in the instructions repo and the three the poller writes are in memory. I did not read the poller to confirm which it writes, so this is a shape that agrees with the entry rather than a measurement of it.

One thing outstanding under a neighbouring entry rather than this one: 0 of the 10,946 transaction rows state an `id`, and 62 of the 62 month pages, 54 of 54 categories, 31 of 31 accounts, 3 of 3 holdings and 1 of 1 tags state none either. Every one still reads back with an id derived from its path, so nothing fails; but `domains/page-type-backing-file.md` asks for a stated one and monarch is the largest single block of what is missing.
