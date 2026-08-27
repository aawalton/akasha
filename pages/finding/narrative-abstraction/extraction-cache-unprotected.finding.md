---
id: 81b6f223-c2c6-5b42-ad36-ddf04233fa4b
slug: extraction-cache-unprotected
page-type-slug: finding
title: "Extraction cache unprotected"
domain-slug: domain/global
---

# Claim

The whole TWI extraction — 824 chapter JSONs, 190 MB, the corpus this domain is built on — lives only at `~/.cache/awen-ingest/019db5f4-088d-7584-9fe7-cc7dbfe51d25/`, and nothing snapshots or backs that path up. The directory it sits in is one whose convention declares its contents disposable, while what it holds is re-derivable only by re-running the whole extraction over 824 chapters.

# Evidence

Measured on this host, 2026-08-07.

`packages/alanwalton/awen/ingest/src/config.ts:13` resolves the cache root to `join(homedir(), ".cache", "awen-ingest")`. Its one populated story directory holds 824 `<n>.json` files, highest chapter number 824, and `du -sh` reports 190M.

Nothing protects it. `findmnt` puts `/var/home` on btrfs `subvol=/home`, subvolid 257. `btrfs subvolume list` returns four subvolumes on that filesystem — `root`, `home`, `var`, `var/swap` — none a snapshot. No `.snapshots` directory exists under `/var/home`, `/home` or `$HOME`. `snapper` is installed, `snapper list-configs` prints an empty table, and `/etc/snapper/configs/` holds nothing. `restic`, `borg` and `btrbk` are not on the host. `systemctl --user list-timers --all` lists ten timers, none a backup; the system list filtered for `backup|restic|borg|snap` returns nothing.

The cost of losing it. The files are one LLM extraction pass per chapter, so the prose in Postgres regenerates them only at full re-extraction cost. `packages/alanwalton/awen/ingest/src/twi-canon-filter.ts:60` calls its list "rhia-verified at drain-end, 823/823", and five test headers describe their fixtures as verified against "the 823-file fold" over this cache — the curated correction map is authored against these bytes.

What this is not: nothing is scheduled to delete it. No rule under `/usr/lib/tmpfiles.d/` or `/etc/tmpfiles.d/` matches `$HOME/.cache`.

No live document covers the path. `domains/disk-store.md` Design says "Volumes are not backed up by default", but its `code-path:` reaches `packages/infra/talos/**` and the k8s trees — cluster volumes, not a workstation home. The observation was recorded in `dirty/skills/narrative-abstraction/findings.md`, which is queued for removal.
