---
id: 722426c8-0c93-5288-9f10-de5dc9574d0c
slug: testflight-poll-401
page-type-slug: finding
title: "Testflight poll 401"
domain-slug: ios-app/alanwalton-ios
---

# Claim

In the alanwalton-ios domain, as of the #15796 cut (build 146, 2026-07-24), TestFlight upload succeeded but the workstation-side --wait processing poll and testflight-status both failed with a 401 from the App Store Connect API's GET /v1/builds — build delivery itself was unaffected, only programmatic tester-visibility confirmation was broken.

# Evidence

Source project: #15812 (status someday_maybe, live-on deploy, domain alanwalton-ios). Carried no objective of its own — captured notes only, moved off the project's retired `notes` attribute on 2026-08-15. Owner athena (mobile infra).

Observed on the #15796 cut (build 146): the upload succeeded (MOBILE_DEPLOY_TESTFLIGHT_OK, build 146 landed on App Store Connect, fingerprint recorded), but the `--wait` processing poll then failed — the ASC API returned 401 for GET /v1/builds, either because key Q5485KN54Y lacks access or the JWT was rejected. The same workstation-side poll backs testflight-status, so both are affected; uploads (mac-side altool auth) are not affected. So build delivery works; only programmatic tester-visibility confirmation is broken.

Question left open: is key Q5485KN54Y missing the App Manager/Admin role needed for the /v1/builds read, or is the workstation JWT mint (ES256, issuer/clock/claims in @alanwalton/mobile-cli asc-client.ts) producing a rejected token? Remediation hint given by the verb itself: grant the key App Manager (or Admin) role in ASC Users and Access Integrations.

Priority: non-blocking (uploads are fine), needed so future cuts can auto-confirm tester-visibility.
