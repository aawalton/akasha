---
id: 853de0db-d137-514d-8282-edfa0da378f5
slug: ingest-cache-sole-copy
page-type-slug: finding
title: "Ingest cache sole copy"
domain-slug: domain/global
---

# Claim

The expensive half of the Awen ingest pipeline is a sole copy with nothing behind it. `~/.cache/awen-ingest/` holds 190 MB of extracted chapter JSON on one btrfs subvolume, is not in git, and no backup timer covers it. The cheap half is durable — the source prose sits in Postgres — so losing the cache costs a full re-extraction of every chapter through the model pipeline rather than any data.

# Evidence

Measured 2026-08-07 on the workstation.

`du -sh ~/.cache/awen-ingest` gives `190M`. The directory holds a story-id subtree (`019db5f4-088d-7584-9fe7-cc7dbfe51d25`), a `_goldens` tree and a `scratch-15566` tree. `packages/alanwalton/awen/ingest/src/config.ts:13` defines `defaultCacheRoot()` as that path, so this is the pipeline's declared cache root rather than an incidental directory.

`systemctl list-timers --all` filtered for `backup|restic|borg|snapshot` returns nothing — no timer covers it. It sits under `/var/home`, which is not a path any repository tracks.

What makes this worth recording rather than obvious: nothing about the current state announces the exposure. The cache reads healthy and every check over it passes, because a cache that is present and a cache that is backed up look identical from every surface that reads it. The exposure becomes visible only when the subvolume is gone, at which point the reading that would have prompted a backup is also gone.

The recovery path exists and is expensive, which is the whole of the claim: re-running 824 chapters back through the model pipeline. Nothing is lost; time and inference are.

Where this came from: `dirty/skills/infra/findings.md` recorded it 2026-07-27 with 824 chapter JSONs and 1,862 character entities. I re-measured the size and the path today; I did not count the chapter JSONs or the entities, so those figures are the original record's and not mine.

Not established: whether btrfs snapshots cover `/var/home` — `btrfs subvolume list /` needs privilege this seat does not hold, so the original record's "no snapshots beyond the base subvolumes" is unverified by me. If snapshots do cover it, the byte-loss exposure narrows and the claim about there being no backup timer still stands.
