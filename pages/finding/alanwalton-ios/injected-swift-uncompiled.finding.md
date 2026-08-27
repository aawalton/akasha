---
id: ae5365f5-9009-5403-bc11-e2cba2bcc3e8
slug: injected-swift-uncompiled
page-type-slug: finding
title: "Injected swift uncompiled"
domain-slug: ios-app/alanwalton-ios
---

# Claim

Every line of native Swift injected into the alanwalton iOS shell by heredocs in `apply-ios-seam.sh` has zero automated verification rung — nothing in CI compiles or parses it — so a malformed heredoc, type error, missing import, or stale import passes CI green and surfaces only when someone happens to run xcodebuild on a mac.

# Evidence

Filed as project #15984 (domain alanwalton-ios), found by #15934's worker (2026-07-25), routed as bigger than its project.

The gap: every line of native Swift in the alanwalton shell is injected by heredocs in `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh`. Nothing in CI compiles it — `ios/` is gitignored and Capacitor-generated, no Xcode project in the repo, no swiftc invocation in any check, no test suite touches the injected code. Reliability's chain is types→checks→tests→manual; here it is only manual, and that rung isn't part of any project's expectations.

Proof it bites: the same worker hit a live instance — the seam script's import inserter was add-only, so running with `NATIVE_SHELL_KOKORO_TTS=0` after a previously-enabled run left a stale `import FluidAudio` while the SwiftPM dependency was gone — a hard build failure in a gate documented to leave no residue. Found while building something unrelated, fixed inline with a `remove_import` mirror.

Why this domain, not the native lane: it's a verification-rung gap in the harness — what automated rung can exist for code generated at build time into a gitignored directory is a CI-shape question.

Directions, none settled, cheapest useful rung wins: (1) cheapest — run the seam script against a scratch Capacitor project, then swift-parse the emitted files (syntax only, no build/signing/SDK) — catches malformed heredocs, unbalanced braces, stale-import breakage without a mac. (2) structural — stop generating Swift from heredocs; move injected sources into tracked `.swift` files the seam script copies, making them ordinary reviewable source. (3) mac-hosted compile step — real coverage, needs the macbook in CI, costliest; fallback. Decide from failure modes actually observed.

Honest scope: "nothing in CI compiles it" is the worker's reported negative, not independently verified by the filer. First step: enumerate what the check workflow does with `.swift` and the seam script.
