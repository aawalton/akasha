---
id: d2eb65e8-0dac-5ecd-9087-864b9d6b7d1e
slug: identity-index-bucket-cost
page-type-slug: finding
title: "Bucketing the identity index"
domain-slug: domain/pages-index-identity
---

# Claim

Keying a pages index by one file per identifier costs 685MB of disk for 13MB of data, and hash buckets bring that to 30MB.

# Evidence

Across 59,355 pages the four identifier kinds — id, slug, name and seq — come to 180,156 handles. Four layouts were measured against that roster.

One file per identifier: 175,330 files, 685MB. Page type folder plus a hash bucket: 26,591 files, 110MB. A hash bucket alone: 1,024 files, 18MB apparent and 30MB on disk. Page type folder plus the value's own first two characters: 11,274 files, 54MB, with 18,848 chapter slugs landing in a single file.

The amplification is the filesystem, not the data. Writing 2,000 one-line files under `.git` on btrfs took 7.9M against 149K apparent, every file taking a 4096-byte block.

The built index answers a cold lookup by identifier in 0.143ms, against 114ms to load the 15MB roster that answers the same question in memory.
