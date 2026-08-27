---
id: da5c2799-5eba-5a02-aee4-24483905c1c6
page-type-slug: finding
title: "Signed sim entitlements blocked"
domain-slug: ios-app/alanwalton-ios
---

# Claim

A signed-simulator build mode for verifying native Keychain and entitlement behaviour agent-side cannot yet be added to `build-sim.sh`, because it is not known which of the two disabled gates (widget or kokoro) the one working recipe actually depended on.

# Evidence

Project #15985 (domain `alanwalton-ios`, status `someday_maybe`). Carried no objective — captured but never defined; this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Follow-on from #15934 (2026-07-25). That worker proved a signed simulator build CAN carry entitlements and used it to close the Keychain round-trip agent-side, but deliberately did not institutionalise the recipe because it could not isolate which of two disabled gates (widget / kokoro) is load-bearing — "a build mode should not ship half-understood."

What is proven (do not re-derive): on the simulator, entitlements are not in the code signature; Xcode generates `App.app-Simulated.xcent` and links it into the binary, so a sim build can carry entitlements. The earlier `-34018 errSecMissingEntitlement` was caused by `CODE_SIGNING_ALLOWED=NO` producing none at all, not a simulator limitation. Round-trip proven on the pinned access group with byte-fidelity (fingerprint `b0bca7ea`). `$(AppIdentifierPrefix)` expands to the real team prefix on the sim even ad-hoc with no provisioning profile.

Two dead ends, not to be retried: post-hoc `codesign --force --sign - --entitlements` never works (app killed at launch for every subset). `codesign -d --entitlements` reads the signature slot and prints an empty dict on a sim build — a false-negative instrument here.

Blocker to clear first: isolate which of the two disabled gates the working build depended on, by enabling each independently against the working recipe and observing — a bisect, not a design question.

Recipe and caveats: #15934 and `packages/alanwalton/native-shell/docs/device-secret-keychain.md`.

Sequencing: lower priority than #15984 (injected Swift has no automated rung at all); revisit if #15984 lands tracked `.swift` files copied rather than heredoc-emitted.

Prize named: an agent-side rung for Keychain/entitlement behaviour — today the only way to verify either is a TestFlight build plus Alan's hands.
