---
id: 9870cc56-77b8-5dec-8b09-e45bc6a4cb46
slug: spawn-still-spells-seq
page-type-slug: finding
title: "Spawn still spells seq"
domain-slug: domain/global
---

# Claim

`ops seat start --seq` still names a seat's project assignment after the value it stores, which is the naming defect #18190 was written to close on the seat verb.

# Evidence

#18190 renamed `--seq` to `--project` on `ops instructions seat` and on `ops seat restate`, and passed verification on 2026-08-09. `ops seat restate --seq` now answers `unknown flag: --seq (did you mean ops seat block-on --seq, ops seat gate-block --seq, or ops seat start --seq?)` — the refusal itself enumerates the three verbs still carrying the old spelling.

Of those three, spawn's is the same concept under a second name: it states the project a seat is being dispatched onto, which is a project assignment. `block-on` and `gate-block` may or may not be the same claim and were not examined.

This is filed rather than cut as a row for a reason worth carrying: #18190 broke the fleet for about twenty minutes doing exactly this rename, because a caller in the other repository passed the flag that went away. `ops seat start` is a more dangerous place to make that mistake, and as this is filed a developer is inside `spawn.ts` on #18191 repairing a path that mints live agents. The sequencing is part of the judgment, not an aside.
