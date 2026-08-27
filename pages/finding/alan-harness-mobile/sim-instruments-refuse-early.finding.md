---
id: 9ec05b53-95ca-5bac-9618-3310839a90f1
page-type-slug: finding
title: "Sim instruments refuse early"
domain-slug: domain/alan-harness-mobile
---

# Claim

Two mobile instruments refuse before reaching what they are named for, so a seat that follows the offered route has to drive the build by hand.

# Evidence

Reported by the seat delivering project #18945, which needed a real Xcode build of both shells to settle a criterion.

`ops mobile sim install --app smilingjenny` offers her shell as a choice and then refuses before it builds anything, demanding an SPA stage her shell has no script for. `--skip-stage` refuses on the same line. The build was taken instead by running `npm run ios:sync` and then `xcodebuild -target SmilingJennyWidgetExtension` directly, which succeeded — so what refuses is the wrapper rather than the build. A verb offering an app it cannot build reads as the supported route right up to the point it fails, which is why it costs a run rather than a minute.

The post-land sim sweep skipped, reporting the macbook's build window held. What held it was an uncommitted `packages/smilingjenny/native-shell/www/index.html` three days old, with no build running. The guard reads a working-tree file as evidence of a live build, so ordinary debris parks the sweep indefinitely and the skip looks identical to a real contention.

Neither was caused by #18945 and neither is that project's to fix. Both were met while verifying it, and both will meet the next seat that needs a device-target build.

What settles the first: `--app smilingjenny` either building her shell or not being offered. What settles the second: the sweep running while an old uncommitted file sits under a native shell, which is the state it skipped on.
