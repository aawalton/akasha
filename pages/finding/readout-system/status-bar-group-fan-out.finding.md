---
id: aee27f55-86b7-561b-a1bd-c3f90cd4667b
page-type-slug: finding
domain-slug: domain/readout-system
title: "The editor status bar expands one six-member readout group into six page queries every five seconds, and that is the whole of the value-green-day-units-on-day traffic"
---

# Claim

The repeating `value-green-day-units-on-day` poll comes from the code editor's `ops` status-bar feature, the client two earlier findings left unestablished. It polls every five seconds and expands a readout group into one request per readout rather than one for the group. The values group has six members sharing one source query and differing only in a `value` argument, so each round sends six requests under that name, concurrently, and nothing collapses them.

# Evidence

Measured 2026-08-23 on the workstation against the running service.

The cadence is `POLL_INTERVAL_MS = 5_000` at `code-editor/extensions/ops/src/features/status-bar/activate.ts:43`, driving `setInterval` at :162. Its comment says the cadence "costs little", and names a consolidated RPC that no longer drives these counts.

The fan-out is `readReadoutGroupReadings` at `code/packages/shared/status-bar-access/src/readout-resolver.ts:178`: `await Promise.all(readouts.map(...))`, one `readReadoutReading` per readout.

The group `alan-harness-stoplights-values` has six members — wealth, love, learn, health, fun, faith — each sourced from `readout-source-values`, which declares `query-slug: value-green-day-units-on-day` and `key-argument: value`.

Six requests per five seconds predicts 1.2 a second, or 120 in 100 seconds. The service journal recorded 121 request-start lines for that query name in 100 seconds.

Cost at that rate, over a separate 180-second window: n=293 answers, min 0ms, median 123ms, p90 264ms, max 285ms, totalling 42,677ms — 24% of the service's wall clock on one query name, on a single thread already at 100% CPU. Callers behind it time out: `ops tracking status` failed its 10,000ms budget on five consecutive attempts and answered on the sixth.

One editor window was running (`extensionHost` count 1). `ss` attributed 24 open connections to port 8787 to `openvscode-server` pid 3469495.

NOT MEASURED. The sibling groups reach the same function — inbox has five members and upkeep six — but their per-group request rates were not pinned separately, so the shared mechanism is read off the code rather than measured for them. Whether the `alanwalton/web` routes that import the same package add traffic of their own was not established. Nothing here separates each answer's derivation cost from its serialisation, and no cache between poller and service was looked for.
