---
id: 318ae1f2-15be-5351-96e4-4de80a24f20a
page-type-slug: finding
title: "Seam anchors moved on clean install"
domain-slug: domain/alan-harness-mobile
---

# Claim

A clean checkout of this repository cannot build either iOS shell, because generating the Xcode project pulls a `@capacitor/ios` whose template no longer carries the anchors the seam script edits.

# Evidence

Met on 2026-08-13 while verifying project #18970, which needed both shells built to settle a criterion. Reported first by the seat delivering that project and reproduced independently by its manager.

`ios/` and `www/` are both gitignored in each native-shell, so a fresh worktree holds no Xcode project and generating one runs `npm install`. That resolves `@capacitor/ios` 8.5.0, whose template moved the `CapApp-SPM` anchors the #15702 seam looks for, and `apply-ios-seam.sh` exits before it reaches its widget section. The macbook's own checkout still holds 8.4.1, which is the only reason a build there succeeds at all.

Both shells were built at `e452c79a46` by making a throwaway worktree on the macbook and symlinking that checkout's existing 8.4.1 `node_modules` into it, then copying the already-generated `ios/` beside it. Both seam scripts then ran clean and `xcodebuild` returned `** BUILD SUCCEEDED **` for `SmilingJennyWidgetExtension` and for `ValuesWidgetExtension`. So what refuses is the generation step against the newer template, not the seam's own edits and not the widget sources.

The branch's base commit fails identically, so no project in the #18969 tree caused it. It is invisible to CI, nothing there compiling Swift, and it is invisible on the macbook for as long as that one lockfile-less install keeps 8.4.1 — which is what makes it a defect that arrives at whoever next builds from a clean tree rather than at whoever introduced it.

What settles it: a clean checkout generating the project and reaching the seam's widget section, on whatever `@capacitor/ios` a fresh install resolves.
