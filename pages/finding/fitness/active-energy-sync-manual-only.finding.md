---
id: 40e6220e-afcc-5005-876a-34d2b1c772f2
slug: active-energy-sync-manual-only
page-type-slug: finding
title: "Active energy sync manual only"
domain-slug: domain/fitness
---

# Claim

Apple Health Active Energy data does not reach the fleet automatically: the only existing transport, #15789's iCloud-file-plus-macbook-SSH-read-plus-systemd-timer bridge, receives nothing because it depends on a hand-built iPhone Shortcut nobody runs manually.

# Evidence

Filed as project #15859, domain `fitness`, status `someday_maybe`.

Goal: sync Apple Health Active Energy (activeCalories) to the fleet fully automatically via a native iOS App Intent instead of a hand-built iPhone Shortcut. Alan chose native over an interim manual bridge (ask-alan 2026-07-24: "skip interim data, just ship native"). Supersedes #15789's interim transport (iCloud file + macbook SSH-read + systemd timer), which never receives data because no manual Shortcut is being run.

Approach (Option A): a `SyncActiveEnergyIntent` App Intent reads `activeEnergyBurned` via `HKStatisticsQuery` and POSTs to a new fleet route (`api.tracking.active-energy`), collapsing the relay into one phone-to-fleet call. Runs headless (`openAppWhenRun=false`, mirroring Athena's Get-Wallpaper #15796), triggered by a nightly Time-of-Day phone automation. Reuses `writeActiveCalories` logic from #15789; needs write auth unlike `api.wallpaper`'s anon posture.

Split (confirmed 2026-07-24): Aelwyn authors the Swift App Intent + fleet endpoint, Athena reviews the Swift. Athena owns provisioning: HealthKit entitlement (`com.apple.developer.healthkit` in `ios-app/App.entitlements`), `Info.plist` `NSHealthShareUsageDescription`, ASC capability-enable (`signing.ts` `POST /v1/bundleIdCapabilities`), and a `NATIVE_SHELL_HEALTHKIT` gate — judged light vs APNs (no `.p8`/portal step). Ships gated until Athena proves capability-enable + entitlement clean via a `--no-upload` dry-run archive, then gate on.

Sequencing: Athena lands the seam first (dry-run proven); Aelwyn pings Athena when ready to build.

Ships via TestFlight cut (`bun ops mobile deploy-testflight`); Alan taps "Allow Health access" once on-device.

Teardown (expand-contract): add endpoint, migrate, remove #15789's SSH-read + systemd timer + cardio-ingest SSH libs, keeping `writeActiveCalories`.

No `# Objective` — captured, never defined as dispatchable work.
