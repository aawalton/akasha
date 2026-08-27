---
id: c9134e90-c3fc-5d61-a793-32e13163446e
slug: cut-fingerprint-unrecorded-for-second-app
page-type-slug: finding
title: "Cut fingerprint unrecorded for second app"
domain-slug: domain/ios-install
---

# Claim

A TestFlight cut for an app other than Alan's records no cut fingerprint, so the owed-cut signal for that app reads OWED forever — including in the minute after a successful cut.

# Evidence

Both apps were cut within three minutes of each other on 2026-08-08, from the same landed SHA.

`ops mobile deploy-testflight` (defaulting to `alanwalton`) ended with two lines: the upload, and
`recorded cut fingerprint (build 171, main bedfdd22a44a)`. `ops mobile cut-status` then read
`Devices current (alanwalton) — last cut (build 171, mainSha bedfdd22a44a) matches origin/main`.

`ops mobile deploy-testflight --app smilingjenny` ended with the upload alone —
`Release build 5 uploaded to App Store Connect / TestFlight` — and no fingerprint line at all. A
search of its whole output for `fingerprint` or `recorded` returns nothing. `ops mobile
cut-status --app smilingjenny` still reads `No TestFlight cut on record for smilingjenny — an
intentional cut is OWED`.

The upload itself succeeded: `UPLOAD SUCCEEDED with no errors`, and App Store Connect reports her
build 4 valid with 5 still processing.

So the fingerprint write is reached on one app's path and not the other's. The consequence is
worse than a missing convenience: the signal cannot distinguish an app that has never been cut
from one cut a minute ago, so the only instrument that says whether her devices are current is
stuck on one answer.

`domains/ios-install.md` defines the domain as a change becoming part of the app on ALAN's
device. A second person now carries an app built from this repository, and this is the first
place that narrowness has shown as behaviour rather than as wording.
