---
id: 968e2da1-e5ba-5ec9-ba58-11e124facd40
slug: render-harness-skips-main-and-decode
page-type-slug: finding
title: "Render harness skips main and decode"
domain-slug: domain/ring
---

# Claim

The iOS widget render harness compiles neither the `@main` widget files nor the decode harness, so a green run says nothing about them.

# Evidence

Found on 2026-08-16 while #19289 stripped comments from 35 Swift files and needed a proof covering all of them.

`packages/alanwalton/native-shell/scripts/render-harness/run.sh` builds its source set from the app's `ios-widget` directory, the shared ring at `packages/shared/ring/ios-widget`, and its own `scripts/render-harness/*.swift`. Its `collect_sources` skips any file matching `^@main$`, which drops `alanwalton/ios-widget/ClaudeUsageWidget.swift` and `smilingjenny/ios-widget/CategorizeWidget.swift`. `scripts/decode-harness/main.swift` is in neither source set, for either app.

That is 4 Swift files the harness never compiles. A green run reports nothing about them and does not say it looked at fewer files than the directory holds, so the omission is invisible from the result.

The skip itself is deliberate — two `@main` symbols cannot link into one binary — so this is a gap in what the instrument can speak for rather than a defect in the skip.

#19289 covered the 4 files separately, by rsyncing the widget directory, the shared ring and the decode harness to `macbook` and running a whole-module `swiftc -typecheck`, which does include the `@main` file, plus a compile and link of the decode harness. Both routes together reach all 35 files.

Nothing else on this workstation compiles Swift, and the repository defines no CI that builds it, so the harness is the only standing proof these files have.
