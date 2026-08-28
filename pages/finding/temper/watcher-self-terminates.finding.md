---
id: a79dd2f2-6c48-57fa-a827-9a688bece39a
slug: watcher-self-terminates
page-type-slug: finding
title: "Watcher self terminates"
domain-slug: domain/temper
---

# Claim

The temper watcher's memory grows through a run until the process ends itself, and the unit then stays dead rather than coming back. The run beginning 2026-08-11 06:18 logged `Shutting down` after 11 minutes 53 seconds at an 8.5G memory peak and exited 0, and systemd left it `inactive (dead)` for 31 hours, over which the game-to-web completion and task sync did not run.

# Evidence

`journalctl --user -u temper-watcher.service` records the memory peak of each consecutive run over 2026-08-10 into 2026-08-11: 567.9M, 442.2M, 545.1M, 877.9M, 6G, then 8.5G. The first five runs are each preceded by a `Stopping` line from systemd; the last is not, so that run ended on its own. `/home/walton/.local/state/temper-watcher/watcher.log` ends that run with a single `INFO Shutting down` at 2026-08-11T12:30:12Z and names no reason. The unit reported `Active: inactive (dead)` with `status=0/SUCCESS` when read on 2026-08-12, and the liveness alert put the last healthy realtime heartbeat 113,376 seconds earlier.

Not measured: why the process chose to shut down, whether the growth is a leak or follows the size of what it was scanning, whether the earlier restarts were deliberate or the same fault, and what `Restart=` the unit declares. A single restart brought it back at 231.9M resident and syncing, so nothing here says how long a fresh run lasts.
