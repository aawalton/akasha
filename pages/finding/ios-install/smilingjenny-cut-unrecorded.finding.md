---
id: dc5afe26-4c3a-53d4-879c-a58bd41898a2
slug: smilingjenny-cut-unrecorded
page-type-slug: finding
title: "Smilingjenny cut unrecorded"
domain-slug: domain/ios-install
---

# Claim

A TestFlight cut of smilingjenny ships without recording a cut fingerprint, so `mobile cut-status` goes on reporting that a cut is owed for that app after one has been made and installed. The same command run for alanwalton records the fingerprint in the same act as the upload.

The readout cannot be repaired by cutting again — a second cut reports the same thing, because what is missing is the record rather than the build.

# Evidence

Both apps were cut on 2026-08-07 from one shell, one after the other, through `ops mobile deploy-testflight --wait`.

The alanwalton run printed `✓ Release build 169 uploaded` and then `✓ recorded cut fingerprint (build 169, main 4799485a23c6)`, and `ops mobile cut-status` afterwards reads `✓ Devices current (alanwalton) — last cut (build 169, mainSha 4799485a23c6) matches origin/main`.

The smilingjenny run printed `MOBILE_DEPLOY_TESTFLIGHT_OK`, `✓ Release build 3 uploaded to App Store Connect / TestFlight`, and `✓ build 3 VALID and tester-visible (READY_FOR_BETA_TESTING), ready to install`. No fingerprint line appeared anywhere in its output. `ops mobile cut-status --app smilingjenny` immediately afterwards reads `⚠ No TestFlight cut on record for smilingjenny — an intentional cut is OWED (devices carry no build from this fingerprint era)`.

So a build that exists, validated and reached its tester is reported by the readout as never having been cut, and the two runs differ in the recording step alone.
