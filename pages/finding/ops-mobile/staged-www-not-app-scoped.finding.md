---
id: 4db71d0a-5f6a-5282-92a3-96b75bfd3fa7
slug: staged-www-not-app-scoped
page-type-slug: finding
title: "Staged www not app scoped"
domain-slug: domain/ops-mobile
---

# Claim

`ops mobile deploy-testflight` injects a staged `www/` directory that is not scoped to the app being built, so an app with no www build step of its own ships whatever app staged last. The fill is guarded and the consumer is not.

# Evidence

`deploy-script.ts:77` passes `stagedWwwDir: MAC_WWW_STAGING_DIR` whenever sync is on, without consulting the app's `wwwStageScript`. The remote script then removes `www`, recreates it, and copies `$HOME/.testflight-www-staging` into it. `mobile-testflight-cut.ts:88` gates the other half, refusing to FILL that directory for an app carrying `wwwStageScript: null`. One directory serves every app.

On 2026-08-17 I took build 13 of `me.smilingjenny.app` this way, and it reached App Store Connect tester-visible carrying Alan's app. The shipped `Payload/App.app/public/index.html` reads `<title>Alan Walton</title>` across 53 files, with a policy naming alanwalton.com, under Jenny's bundle id. I read that out of the exported IPA rather than the source tree. It has since been expired.

A wrong app uploaded to Apple under another product's identity is what the gap costs.

What staged last was Alan, and the sweep put it there: `ops mobile sim sweep` installs his shell, which refilled `~/.testflight-www-staging` at 09:51, and the build injected it at 10:01. The 50 untracked files the build left in her `www/` are byte-identical, file by file, to that directory. That byte-identity is what makes this measured rather than inferred.

The same injection overwrites an authored `www/index.html` that is tracked in git, which leaves the checkout dirty and then silently holds the sim sweep's build window.

Cleaning the checkout beforehand does not prevent it. I restored the tracked page to HEAD and confirmed `git status --porcelain` was empty before the build; the injection happens inside the run, and the tree was dirty again afterwards with the same three entries.

`--no-sync` avoids it, because `deploy-script.ts:68` skips `buildNativeRegen` entirely and nothing is injected. Build 14, archived that way after a manual `npm run ios:sync`, carries `<title>Smiling Jenny</title>` at 3 files with no reference to alanwalton.com.
