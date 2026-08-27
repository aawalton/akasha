---
id: 260f3b59-6bf3-5d27-a4c3-e1d554c7f6ae
slug: device-secret-keychain-bridge
page-type-slug: finding
title: "Device secret keychain bridge"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The device-secret Keychain bridge for the iOS App Intents (native Keychain read/write/clear headlessly, a web-view hook minting and handing off the plaintext secret once, and a sign-out path clearing Keychain before revoking server-side) depended on #15924's keychain-access-group entitlement, which landed and was verified — and that group turned out optional rather than load-bearing, since App Intents run in the main app target and already share the app's default keychain domain.

# Evidence

Project #15933, domain `alanwalton-ios`, status `someday_maybe`, `live-on: deploy`.

Scope as captured, depended on #15924 (keychain-access-group entitlement first): (a) native Keychain bridge readable from a headless App Intent — writes/reads/clears the device secret in the shared Keychain group (Keychain, not app-group UserDefaults); (b) web-view sign-in hook POSTing `{deviceId: identifierForVendor}` to aelwyn's `mint` endpoint (session-authed), receiving `{ok, deviceSecret: 'dvs_v1_<43>'}` — the only time plaintext exists — handed to the Keychain bridge, never logged/persisted; (c) sign-out: clear Keychain, then call `revoke {deviceId}` (idempotent); re-mint supersedes a prior secret and clears revocation — re-sign-in self-heals.

Boundary with aelwyn: JS half is athena's; aelwyn owns mint/resolver/revoke server-side. Contract at `device-secrets.md`. `deviceId` = `identifierForVendor` (fresh identity; `device_tokens` keys on APNs token, no vendor UUID).

Update 2026-07-25T06:15:36Z: #15924 landed (`3dbc530`), unblocking this slice. Athena verified provisioning: `keychain-access-groups=[$(AppIdentifierPrefix)com.alanwalton.app]` (expands to `M6AN6NM6FL.com.alanwalton.app`) in `App.entitlements`.

Finding that changed this slice's design (from the #15924 worker, accepted by athena): the access group is optional here, not load-bearing — App Intents run in the main app target, sharing the app's default keychain domain without a group. Provisioned anyway as future-proofing for a later app-extension move; pin it as cheap insurance, don't treat group plumbing as a blocker.

Server side live (aelwyn, `99bb873`): mint/revoke endpoints as above, session-authed.

Storage discipline, non-negotiable: plaintext goes web-view → Keychain bridge and nowhere else — never logged, never in localStorage, never held in app state beyond the handoff.

An operational detail from aelwyn was cut off by the capture at a paragraph boundary; only its heading survived.
