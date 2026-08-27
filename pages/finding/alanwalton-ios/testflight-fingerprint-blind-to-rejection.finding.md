---
id: f38bd1c4-c546-5746-8095-252e17fd4260
slug: testflight-fingerprint-blind-to-rejection
page-type-slug: finding
title: "Testflight fingerprint blind to rejection"
domain-slug: ios-app/alanwalton-ios
---

# Claim

In the alanwalton-ios domain, deploy-testflight (packages/alanwalton/mobile-cli) writes the mobile-cut fingerprint on Apple-upload success rather than on Apple-side VALID+tester-visible confirmation, so cut-status can report a build as shipped when it never became installable, and the --wait loop cannot detect an Apple rejection at all: it polls only for presence, and since a rejected build never appears, it burns its full 30-minute timeout reading as slow processing rather than refusal.

# Evidence

Source: project #15815 (someday_maybe, live-on deploy, domain alanwalton-ios), captured notes, no objective, moved off `notes` 2026-08-15.

Provenance gap in packages/alanwalton/mobile-cli (astra's lane): deploy-testflight writes the fingerprint on upload success, not Apple-VALID/tester-visible. cut-status (the owed-cut detector) can report a "last cut" that never shipped: a false CURRENT or missed owed-cut.

Original evidence (2026-07-24, aura shipping #15799): cut-status reported last-cut = build 146, but testflight-status showed Apple's latest VALID was 144 — 145/146 never went valid. aura's fresh `--wait` cut 147 came back clean; the pipeline was healthy, purely a provenance gap. Priority at first capture: low/non-urgent.

Scope-growth (2026-07-25T12:11), worse instance: astra cut build 157 at 11:58:17Z carrying #15906's audio-crash fix; Apple rejected it 37s later. Newest installable remained 149 (predating the fix). #15906 sat at verification_user — Alan was one tap from installing the still-crashing app a third time. Caught by amy via Apple's email, not tooling.

Site 1: `cut-status` printed "last cut = build 157 ... SHIPPED" — false; testflight-status said "build 149 VALID" the same minute. Outcome ("CUT OWED") was right, so the error was invisible unless the build number was checked.

Site 2 (worse): `deploy-testflight --wait` cannot see the failure — OK on upload, then "waiting for the build to appear" 10+ minutes. A rejected build never appears, so it reads permanent absence as "not yet," burning the full 30-min budget, indistinguishable from slow processing.

Root framing (amy): "upload returned success" is the mechanism; "Apple marked it VALID and installable" is the consequence; only the second is what a cut means. Fix shape: one SHIPPED notion (VALID + tester-visible), used by both fingerprint and wait loop, plus a rejection test. Raising the timeout was rejected as a fix.
