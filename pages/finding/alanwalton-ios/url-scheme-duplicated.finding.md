---
id: a43feeb2-a3a8-56e9-a1e8-b02eeb3f792a
page-type-slug: finding
title: "URL scheme duplicated"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The iOS app's custom URL scheme string is duplicated in two files that cannot import from each other — `apply-ios-seam.sh` (`CFBundleURLTypes` registration) and `link-target.ts` (`APP_URL_SCHEME`, the outbound URL builder) — and nothing automated checks the two stay in sync, so a divergence would make an outbound tap silently do nothing, undetectable by types, checks, unit tests, or browser tests, and observable only on a real device.

# Evidence

Project #15921, domain `alanwalton-ios`, status `someday_maybe`, `live-on: deploy`.

Follow-up from #15793, deliberately not bundled into it — that branch was green and land-ready, and expanding it would have gold-plated a finished change.

`native-shell` is deliberately not a monorepo workspace (shares no TypeScript with the build graph, built standalone on the macbook), so a shared constant is not available. worker-15793 hand-synced the two occurrences with reciprocal comments, each naming the other, judged the right pragmatic answer.

Why it still earns a check (Reliability — push detection to the cheapest/earliest rung): if the two ever diverge, the outbound URL uses a scheme the app has not registered, so the tap does nothing. That failure is silent in every automated rung — types, checks, unit tests, and browser tests all pass, because the mismatch is only observable when a real iOS device tries to resolve the scheme. Device-only detection is named as the single most expensive rung there is, costing Alan attention rather than CI time. A grep-based equality assertion across the two files would catch it for a few lines at the static rung.

Proposed scope, not built: one check in `packages/infra/checks` following existing conventions (no new pattern) that extracts the scheme literal from both files and fails loud when they differ. Kept dumb by design — a literal string comparison, not a parser.

Not urgent: the two are in sync as landed, and nothing is broken today. This is prophylactic.
