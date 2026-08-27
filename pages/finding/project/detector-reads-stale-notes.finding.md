---
id: f1ed8e36-a029-568d-b0af-3fa9d6490b95
page-type-slug: finding
title: "Detector reads stale notes"
domain-slug: barred-meaning/project
---

# Claim

The stale-project-detector deployed to production still reads the retired `notes` attribute (substring-testing it for "verdict" at `stale-project-detector/src/wedged-ci-state.ts:175-184`) even though #17615 landed the fix on `main`, so every wedged/not-wedged verdict it reported between #17615 landing and the next deploy was computed from a field nothing maintains and is unjudged, not confirmed right or wrong.

# Evidence

Project #17673, domain `project`, status someday_maybe, live-on deploy.

Objectives (unchecked):
1. The stale-project-detector running in production reads what #17615 left — verify the deployed instance, not the source on `main`, by observing the running service.
2. No detector arm still reads the retired `notes` attribute — every reading of it in the service is gone or re-pointed, checked in the deployed build.
3. What the detector reported while stale is judged — its output between #17615 landing and this deploy was computed from a field nothing maintains, so any alert it raised or suppressed in that window is unreliable rather than wrong; say which, on evidence, since the detector's whole job is deciding which rows look wedged.

Notes: DO NOT START WHILE THE SENTINEL STANDS — read `~/.allow-direct-main` rather than recalling it. While it stands, deploy is off the path, a push publishes other seats' work, and the full-CI gate on `awaiting_lead_verification` is structurally unreachable. Row cut now only to record the deferral so it is not rediscovered; claimable once the sentinel lifts and the backlog reconciles through CI.

Repair target: `stale-project-detector/src/wedged-ci-state.ts:175-184`, which substring-tests the `notes` attribute for "verdict". Verify the position before touching it — #17615 may already have changed it on `main`; only the deployment lags, not the source.
