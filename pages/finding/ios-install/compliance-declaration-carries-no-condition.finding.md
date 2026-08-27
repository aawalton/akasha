---
id: b0e41152-fc99-5b84-9c5b-c7dabefcae5b
page-type-slug: finding
title: "Compliance declaration carries no condition"
domain-slug: domain/ios-install
---

# Claim

Three iOS shells hardcode the Apple export-compliance self-declaration `ITSAppUsesNonExemptEncryption=false` into every build, and a live remediation string tells a seat to PATCH that same `false` into App Store Connect to unpark a blocked build. No site states the condition it rests on — only Apple TLS, no custom cryptography. The one surface stating that is a quarantined document queued for deletion, so an app adding custom crypto would keep declaring otherwise to Apple with nothing reading back.

# Evidence

At `~/code` on `main`, `rg -uuu -l "ITSAppUsesNonExemptEncryption" .` returns five paths. Three are seam scripts:

- `packages/smilingjenny/native-shell/scripts/apply-ios-seam.sh:63`
- `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh:246`
- `packages/alanwalton/atlas/native-shell/scripts/apply-ios-seam.sh:63`

each the literal `"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"`, run from the `ios:add` / `ios:sync` scripts after every Capacitor regeneration. Each header comment says what the key IS — "export-compliance self-declaration", at lines 14, 8 and 19 — and what happens without it. None says what makes `false` correct, or when it would stop being.

The fourth is `packages/alanwalton/mobile-cli/src/lib/testflight-poll.ts:108`, the remediation a seat is handed when a build parks: "Backfill via the ASC API (PATCH the build with usesNonExemptEncryption=false) to release THIS build". It fires when a build is blocked from reaching Alan, and carries no condition either.

`rg -uuu -il "ITSAppUsesNonExemptEncryption|export.compliance|non-exempt"` over `domains/`, `tools/`, `notices/` and `settings/` in `~/instructions` exits 1. Nothing live binds this.

The condition is stated in exactly one place: `dirty/code/packages-alanwalton-atlas-native-shell-claude.md` — "Atlas uses only Apple-provided HTTPS/TLS (exempt) and no custom crypto, so `false` is correct... Revisit if Atlas ever adds non-exempt or custom cryptography." That file is under quarantine and is being emptied block by block as I write this, which is why this is filed rather than kept.
