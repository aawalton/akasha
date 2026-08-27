---
id: 7ef83ab2-1437-5e19-a91e-57ce9b00124b
page-type-slug: finding
title: "Package docs cited by path after removal"
domain-slug: domain/alanwalton-app
---

# Claim

Six tracked live files under `packages/alanwalton/` cite package documentation by relative `docs/<name>.md` path across nineteen lines, and none of the three `docs/` directories those paths resolve in still exists. Two of the seven names cited resolve nowhere in either repo; five stand only under `dirty/`. The citations are prose rather than compile-enforced literals, so nothing pins them and no gate reports them, and four of them cite section numbers of an already-removed document.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-native-shell-docs-apns-push-provisioning.md`.

Directories: `git ls-files "<pkg>/docs/"` returns 0 tracked files for each of `native-shell`, `mobile-cli` and `apns-sender` under `packages/alanwalton/`.

Citers: `rg -l "docs/[a-z0-9-]+\.md"` over those three trees returns six tracked files — `apns-sender/src/apns-config.ts`, `native-shell/scripts/apply-ios-seam.sh` (14 lines), `native-shell/ios-widget/ClaudeUsagePayload.swift`, `native-shell/scripts/decode-harness/main.swift`, `mobile-cli/src/lib/signing.ts`, `mobile-cli/src/mobile/sim/suite/scenarios.ts` — 19 lines in all.

Names cited: `apns-push-provisioning`, `device-secret-keychain`, `healthkit-provisioning`, `native-seams`, `sim-suite`, `url-scheme-seam`, `widget-feed-pipe`.

Two resolve nowhere. `healthkit-provisioning` was removed at `c5754cb79`, `apns-push-provisioning` at `3f9b9666a`. Neither stands in `~/code`, in `~/instructions` live, or under `dirty/`. The other five sit under `dirty/code/` and are queued for the same.

Section-level dangling. `apns-config.ts` cites the removed document four times by section: line 3 "materialized from ... §3", then "provisioning doc §2", "§3/§4", and "§1.7" twice. `apply-ios-seam.sh:2557` names both fully-gone documents in one line.

Nothing refuses it. `ops enforcement list` names no gate over documentation paths cited from code. The instructions repo's own `[links]` and `[mentions]` gates cover that repo, not `~/code`.

Differs from `pages/finding/handler/context-doc-names-nothing-live.finding.md` in mechanism and scale. That one is `contextDoc:` compile-enforced literals on two dispatch modules, where the compiler pins the spelling. Here the reference is ordinary prose in six files across three packages: no literal to pin, no type to break, and a section number that no rename could have preserved.

Not established: whether these `docs/` trees were meant to be reconstructed in `~/instructions`, or the citations dropped along with them.
