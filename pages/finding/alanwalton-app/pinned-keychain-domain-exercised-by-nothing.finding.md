---
id: 449602ba-b5b9-5d30-9773-83d348a1d76b
page-type-slug: finding
title: "Pinned keychain domain exercised by nothing"
domain-slug: domain/alanwalton-app
---

# Claim

`build-sim.sh` builds with `CODE_SIGNING_ALLOWED=NO`, so the simulator app carries no entitlements and `DeviceSecretKeychain` always falls back off its pinned access group. The pinned path — the one every signed build uses — is exercised by nothing an agent can run, while the fallback that hides this reports green. A signed simulator build was proven possible and deliberately not landed, and the negative results from that investigation are recorded in no live file in any of the seven repositories.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying the quarantined `device-secret-keychain` head document.

`native-shell/scripts/build-sim.sh:111` is the only signing line in its 127: `CODE_SIGNING_ALLOWED=NO`.

From the Swift in `apply-ios-seam.sh`: `enum DeviceSecretKeychain` pins `accessGroup = "M6AN6NM6FL.com.alanwalton.app"`; `store()` calls `SecItemAdd` with `kSecAttrAccessGroup` set, then `guard pinnedStatus == errSecMissingEntitlement else { … return nil }`, removes the key and retries; `enum Domain: String { case pinned; case fallback = "default" }` is what it reports. With no entitlements there is no access group at all, so every simulator operation takes the fallback arm.

The unlanded investigation. A signed simulator build was proven possible: simulator entitlements are linked in rather than signed, as `App.app-Simulated.xcent` via `-sectcreate __TEXT __entitlements`, and `$(AppIdentifierPrefix)` expands to the real team prefix under an ad-hoc identity. Three negative results came with it. Post-signing with `codesign --entitlements` gives a signature valid on disk but the app is killed at launch (`FBProcessExit` 64 / POSIX 163), with and without `--deep` and for every entitlement subset including the empty one. `codesign -d --entitlements` reads the signature slot and prints an empty dict, so the `-Simulated.xcent` must be read instead. And `CODE_SIGN_ENTITLEMENTS` must not go on the `xcodebuild` command line: it then applies to every target, and each SPM dependency fails on its own relative path.

None of that is recorded live: `rg -uuu -l "Simulated\.xcent|sectcreate"` exits 1 over `~/code` and returns nothing in `~/memory`, `~/books`, `~/stories` or `~/esoui`.

`ops enforcement list` names no gate over simulator signing or Keychain domains. Distinct from `pages/finding/alanwalton-app/sim-strip-states-its-workaround-as-a-limit.finding.md`, the same script on another axis.

Not established: which of the two targets failing under global signing is load-bearing. Never isolated, which is why the mode was not shipped.
