---
id: 78ea3fa2-d856-597a-9ef8-69a4571030dc
page-type-slug: finding
title: "Slow suite intermittent red at main"
domain-slug: domain/global
---

# Claim

A slow suite fails intermittently at main's own head. Over three consecutive runs of the same 122-suite selection at main, one run came back red with a real failure tally and the two after it passed 122 of 122. Nothing else in CI runs these lanes, so the failure is visible only to whoever runs the gate.

# Evidence

Reported by the seat that removed the slow-suite gate's base-ref control, from three runs it made against the deployed gate at main's head on 2026-08-12. The red run carried a shard verdict of `fail` over a complete `Ran 864 tests across 122 files` summary, so it was a failing test rather than a shard that died before printing. That run's output was lost to a truncated pipe, so the failing test is not named.

Not measured, and not reproduced by anyone since: which suite or test failed, whether the same one would fail again, and whether the cause is the suite or the workstation it ran on. Many of the 122 are `.cli.test.ts` suites driving the real `ops` CLI against the shared database while other seats are working, which is where the reporting seat would have looked first, but nothing here establishes that as the cause. The rate is one in three over three runs, which is a count and not a measurement of how often it happens.
