---
id: a9fcf5ec-9e6f-523c-a529-c4ee5d8b70d7
page-type-slug: finding
title: "Inserting a key at the top of frontmatter shifts every read span, so the file reads as wholly moved"
domain-slug: domain/agent-harness
---

# Claim

A read record stores the line `spans` a reader saw. Inserting a key at the top of frontmatter shifts every following line by one, so any judgement built on spans sees the whole file as moved rather than one line added. `tools/page-id.ts` inserts `id:` as the first key, which is the corpus convention and worth keeping; appending would shift nothing. A mechanical pass over many files pays this against every reader that had already read them.

# Evidence

Measured on 2026-08-20 while backfilling `id:` into 11,904 pages across four repos.

A record entry, read from `/var/home/walton/.instruction-reads/`, is `{"at": 1787234904390.855, "spans": [[1, 13]], "blob": "f8efe97b…", "seen": …}`. The `at` is the file's `mtimeMs` rather than a read clock: comparing recorded values against `os.stat` matched to sub-millisecond float precision on every entry checked.

`firstUnreadLine` (`tools/lib/read-log.ts:134-152`) returns `1` whenever `entry.at !== at`, and otherwise merges the spans and reports the first line past what they cover. So spans are only consulted once the file is agreed to be the one that was read; they are not themselves a change detector today. The observation here is about what they would cost if anything were built on them.

The cost of an id insertion, measured across the whole workstation after the instructions half of the sweep landed 3,192 files: 5,528 read records exist, 552 reference at least one file touched, and 371 records had been written in the preceding three hours. Of those, 190 were forced to re-read something, the largest owing 83 files. Of the 3,192 files, 1,644 appear in some record and 1,548 appear in none, so slightly under half the sweep forced nothing at all.

Note what this is not. The blob comparison now in `verdictOn` settles the case where bytes are identical and only the timestamp moved. It does not reach this one: adding `id:` changes the bytes, so the file genuinely differs and a re-read is owed. The span shift matters only to a future judgement that tried to ask which part of a file changed.
