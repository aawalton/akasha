---
id: a06f85e1-de1d-574b-aa1e-3bb37c4fc35f
page-type-slug: finding
title: "IOS seam breaks on capacitor 8 5"
domain-slug: domain/alan-harness-mobile
---

# Claim

Alan's iOS seam breaks on a clean dependency install, because `@capacitor/ios` 8.5.0 moved the anchors the #15702 seam patches, and nothing reaches that state until somebody installs from scratch.

# Evidence

Reported by the seat delivering project #18970, which needed a real Xcode build of both shells to settle a criterion.

In a fresh worktree, `npm install` inside `packages/alanwalton/native-shell` resolves `@capacitor/ios` to 8.5.0. `npm run ios:sync` then runs the whole seam and exits 1 at `scripts/ios-seam/10-xcode-project.sh` with `ERROR: CapApp-SPM anchors not found — Capacitor template changed; update the #15702 seam.` That step runs BEFORE the widget section, so the extension's sources are never copied and no widget target is ensured — Alan's shell does not build at all by the route its own scripts offer. Jenny's seam has no such step and completed on 8.5.0.

The macbook's own `~/code` builds because it still holds 8.4.1 from an earlier install. Pinning the worktree to that same 8.4.1 tree made the seam complete and both `xcodebuild` runs succeed, which is what settled #18970's build criterion.

This is not #18970's doing and was confirmed so: a worktree at that branch's BASE commit, `c5a68fe1a2`, fails at the identical line. It is dormant rather than absent — `build-sim.sh` runs `npm install` on every sim install, so the first one to resolve 8.5.0 on the macbook takes Alan's shell out.

What settles it: `npm run ios:sync` completing on a native-shell whose `@capacitor/ios` is 8.5.0 or later, with `ValuesWidgetExtension/` populated afterwards.
