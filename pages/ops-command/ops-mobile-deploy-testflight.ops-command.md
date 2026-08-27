---
id: ba7b2d1d-2c58-50b9-a999-595def3d961f
page-type-slug: ops-command
title: "Ops mobile deploy-testflight"
slug: ops-mobile-deploy-testflight
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/deploy-testflight.ts
path: mobile deploy-testflight
irreversible: true
---

# Definition

- **Ops mobile deploy-testflight** — a signed Release build of an app's iOS shell, archived on the macbook and sent to TestFlight.

# Help

Cut a signed DISTRIBUTION build of a named app's Capacitor iOS shell on the macbook and ship it to TestFlight (Path B). Builds the SPA www/ on the workstation from the pinned origin/main tip and rsyncs it to the mac before cap sync (www/ is no longer committed — #15085/#15271), then drives `ssh macbook` end-to-end and SELF-HEALS its own signing: unlock the codesigning keychain, scope the keychain search list to login-only (so codesign resolves the distribution key, not a shadowing build keychain), regenerate the native project (unless --no-sync), ensure the App Store provisioning profile exists via the App Store Connect API (creating it against the local distribution cert if missing), `xcodebuild archive`, then a MANUAL `xcodebuild -exportArchive` against the ensured profile (bypassing xcodebuild's cloud-managed signing, which the ASC key's role does not grant), then `xcrun altool --upload-app` (or, under --no-upload, `xcrun altool --validate-app` — App Store validation WITHOUT delivering the binary). On success it records a mobile-cut fingerprint (build number + shipped main SHA + tree-hashes) that `ops mobile cut-status` reads. On a signing failure OR an App Store validation/upload rejection it fails LOUD with a typed, actionable remediation message rather than a raw xcodebuild dump — altool's stderr is folded into the captured stdout, so the failing step's full diagnostic reaches the durable log instead of the bare one-line summary altool prints to stdout. Reuses the shared `ops mobile` foundation. Distinct from Path A's direct device install (`deploy-device`).
