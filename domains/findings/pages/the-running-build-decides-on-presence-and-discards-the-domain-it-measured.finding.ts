import type { Finding } from "../finding.page-type.ts"

export const theRunningBuildDecidesOnPresenceAndDiscardsTheDomainItMeasured = {
  id: "01a05d7f-5b89-7fe7-b08c-7bed34cf1975",
  pageTypeSlug: "finding",
  slug: "the-running-build-decides-on-presence-and-discards-the-domain-it-measured",
  domainSlug: "ios-app/alanwalton",
  claim:
    "Alan's running build decides whether to mint a device secret from presence alone, discarding the keychain domain its own native layer measures, so a secret in the app-private domain satisfies the app forever while the widget extension's read of it is refused. The tree no longer does this; the phone does, until a build carrying the change reaches it.",
  evidence:
    "The native layer measures the domain and always has. In `akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-device-secret/alanwalton-device-secret.shell-script.shell.sh`, `peek` at :116 answers which domain the item was found in, the bridge at :181 resolves that as `pinned` or `default` (the enum's raw values at :39), and `store` at :86 adds with `kSecAttrAccessGroup` then, on `errSecMissingEntitlement`, removes the group and retries at :105, so an item can land where no extension reads it. Above that the field was dropped: `device-secret-minting.module.code.ts:1` declared `PeekProbe` with no domain and answered `skip` on presence alone, and `probeKeychain` at `alanwalton/web/app/device-secret/components/device-secret-sync.tsx:17` built that value from `result.present` and discarded `result.domain`. The widget cannot make up for it: `alanwalton-device-secret-reader.ios-component.swift.swift:11-17` queries with `kSecAttrAccessGroup`, and a cross-process keychain read has no other form. Build 198 (mainSha `04959e93f4`) resolves `domain`, and its web assets ride in the same archive (`webDir: \"www\"`, no `server.url`, CSP `script-src 'self'`), so the JS on the phone is that commit's. What the phone holds is inferred rather than measured: `[device-secret] refusing: the device secret presented is absent` proves only that the widget sent no header, and no mint has ever landed — no commit carries `a device secret is minted`, and the two device-secret pages of 2026-08-31 23:10 were written by `Akasha` rather than by the route.",
} as const satisfies Finding
