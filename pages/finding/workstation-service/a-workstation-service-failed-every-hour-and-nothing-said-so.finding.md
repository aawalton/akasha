---
id: 01a04c31-7d2e-7000-9f41-2b6ac9d3e075
page-type-slug: finding
title: "A workstation service failed every hour and nothing said so"
domain-slug: page-type/workstation-service
---

# Claim

`daily-tracking-points` has failed on every hourly run since 2026-08-27 19:12, and nothing reported it. Six user units stand failed now. One of them is refusing correctly and exiting 1, and nothing tells it apart from the ones that are broken. No instrument reads unit state at all.

# Evidence

Read on 2026-08-27 at 23:11 MDT on this workstation.

`services/daily-tracking-points.ts:41` and `services/great-courses-sync.ts:38` each run `process.env.PAGE_QUERY_ORIGIN ??= pageQueryOrigin()`. `tools/lib/page-query-client.ts:40-44` was rewritten at `58e35244e` (19:12:27) to throw where that variable is unset, on the ground that only an off-workstation caller states it. Both service documents are `enabled: true` and both run here.

`systemctl --user is-failed daily-tracking-points` answers `failed`. The journal holds the same throw at 20:00:00, 21:00:02, 22:00:01 and 23:00:02 — four runs, each `at pageQueryOrigin (tools/lib/page-query-client.ts:43:9)` then `at main (services/daily-tracking-points.ts:41:37)`. The timer is hourly with catch-up. `great-courses-sync` fires at 07:37 and has not reached the throw yet.

`systemctl --user list-units --state=failed` answers six. `sweep-seat-pages` is among them and is not broken: it prints `uncertain: ki states no presence that could be read, so its page and its sidecar stand` and exits 1, which is Answer Or Refuse kept. `monarch-poll` and `monarch-sync` exit on `Monarch API 401`. One systemd state carries a correct refusal and three unrelated faults.

Nothing reads that state. The Prometheus rules alert on `PodCrashLooping`, `TargetDown`, `NodeMemoryPressure` and `NodeDiskPressure`; `collector.systemd` appears nowhere in the tree; and no file under `tools/`, `services/` or `readouts/` reads unit state.

The refusal itself is right: `pageQueryOrigin` throwing is a failure reported where it happens rather than answered as an empty. What was missed is that a correct refusal at one layer is a silent recurring outage at another when its caller is a timer nobody watches.

Not measured: how long the other five have stood failed, and whether any earlier hourly run was lost the same way before 19:12.
