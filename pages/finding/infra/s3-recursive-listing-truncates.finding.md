---
id: 79467ec7-5cad-5a68-8120-cd5bbaf53241
slug: s3-recursive-listing-truncates
page-type-slug: finding
title: "S3 recursive listing truncates"
domain-slug: domain/global
---

# Claim

Recursive object listings through the SeaweedFS S3 gateway truncate silently, returning a prefix of the keyspace and exiting zero. On the bucket holding the most directory entries the reported total size is about a hundredth of the true one, so any figure `rclone` takes through that gateway is a lower bound of unknown tightness.

# Evidence

Measured 2026-08-04 between 18:35 and 19:45.

The sound comparison is total SIZE, which both instruments measure the same way. For `loki-chunks`, `rclone size` through the gateway reported 7.419 MiB; the filer reports `fs.du /buckets/loki-chunks` -> logical size 774907720 (~739 MiB). Roughly 100x, and the S3 result exited zero with no warning. `rclone lsf --files-only -R` returned 63 keys.

The truncation is ordered rather than random: of the live fingerprints returned, all began `10` and sorted below about `103b`, which is not a distribution hash fingerprints produce. A directory outside that range (`fake/d7f06726bdcf5c02`) holds a live chunk the listing never returned.

`fs.du`'s `block:` count is storage blocks, NOT objects, so it is not comparable to an object count. Where files are small the two converge and where they are large they diverge: `persona-voices` 48 keys against block:48, `story-audio` 3 against block:3, `persona-images` 150 against block:172 at ~2.2 MiB per file. `loki-chunks` reports block:59393 over 739 MiB, ~13 KiB per block, the small-file regime — but the claim rests on the size, not on this.

DELIMITER listings are unaffected: `rclone lsf --dirs-only` against `loki-chunks/fake` returns 1,029,647 and paginates correctly. That is why a directory count and an object count taken through the same tool in the same minute disagree by four orders of magnitude and only one is wrong.

Independent of both tools: `packages/infra/seaweedfs/k8s/synth-backup.ts` documents ~11 KiB per Loki chunk and a peak of ~235k objects. The filer's ~13 KiB per block agrees; the S3 figure implies ~118 KiB per object across 63 objects and cannot represent that peak at all.

Not measured: where the cutoff sits and whether it is a page, byte or time bound; whether single-directory listings are affected; whether other S3 clients against this gateway hit the same bound; and how much of the smaller `agent-sessions` and `headscale-db` gaps is truncation rather than drift.
