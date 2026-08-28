---
id: 9a38b049-e36c-57b2-b549-14701a71abc7
slug: cold-path-coverage-gap
page-type-slug: finding
title: "Cold path coverage gap"
domain-slug: domain/temper
---

# Claim

The cold path a new Temper user walks exactly once (anonymous landing → sign up → onboarding → watcher install/link → first sync/first data → first build) is a cross-surface sequencing dimension that the existing 8-slice surface audit does not cover, because those audits ran against an already-authenticated app and verified each screen in isolation and in steady state rather than the sequence of transitions and state accumulating across them.

# Evidence

Project #15909, domain `temper`, status `someday_maybe`, `live-on: deploy`.

Filed to close a coverage gap found while treating #15907 (new-user Electric sync dying on the form-sign-in path) as a test-rig gap. #15907 is a cross-surface sequencing bug — damage happens in a transition (signed-out shell mount → form sign-in → post-auth state), visible only two surfaces later, as data that never arrives. Aine (vision seat) recommended the cold path become an explicit coverage dimension; confirmed not covered.

Cold path named in full: anonymous landing → sign up → (email confirmation?) → first landing post-signup → zero-data onboarding → discover the watcher → install it → link it (`/cli-link`) → first sync → first data appearance in the UI → first build created → completion/inventory/shopping populating for the first time.

Scope: web surface; the in-game cold path is the same dimension on Nimue's half (#15872, rig-gated), handed to her as an addendum. Find-only first, as the original 6 surface slices were; fixes batch and dispatch after. Not to be re-reported: #15907. Everything else on the path is in scope.

Amendment, 2026-07-25T03:11:41Z (Nimue, adopted): artifact rot never converges, so "dry" is not terminal for one finding class. Other bug classes are change-triggered, so find→fix→verify-until-dry stays dry. The third-party-artifact class fires with zero commits (a link dies, a host changes its scheme, a version is yanked, an endpoint deprecates), invisible to CI by construction. Consequence: code-bug findings may close; the third-party-artifact class may only be "verified as of &lt;date&gt;" — before David is handed the app, artifact checks (outbound mail, watcher artifact, external auth legs, first-sync calls) must be re-run however recently they passed.

Cadence: re-verification precedes every cold-path walk plus real demand points (pre-release, pre-onboarding), driven by arrival of work, never time.
