---
id: d6a9a8ca-cd8a-5d70-9ecf-3c250252eb04
page-type-slug: finding
title: "Spawned agent settings files accumulate in shared tmpfs and nothing ever removes them"
domain-slug: domain/agent-runtime
---

# Claim

Nothing ever removes a spawned agent settings file, and they are written into `/tmp`, which here is a tmpfs the whole fleet shares.

A spawn names the file for a digest of the settings document, so every distinct document ever spawned against leaves one behind for good. The seats watching them are gone; the files are not.

`agent-harness` bars `/tmp` because it fills on file count. One a live process watches is not throwaway — but nothing tells the live from the dead, and nothing sweeps either.

# Evidence

`tools/lib/supervisor-spawn-settings.ts` line 115 composes the target as `${opts?.tmpDir ?? "/tmp"}/agent-settings-${digest}.json`, so `/tmp` is what every real spawn takes.

Read on 2026-08-21: 29 files match `/tmp/agent-settings-*.json`, while `ops seat refresh-settings` — which finds the live ones by scanning `/proc` for a `--settings` argument — reports 4. So 25 of the 29 belong to no running process. The oldest carries a modification time four days before the newest.

`/tmp` is a 32G tmpfs holding 11,243 entries at that reading. A search of the repository for `agent-settings` finds the composer, the reader, `tools/agent-settings.ts` and this command, and no timer, service or sweep that removes one.
