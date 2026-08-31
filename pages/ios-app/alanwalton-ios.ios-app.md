---
page-type-slug: ios-app
id: b9d387c7-59bd-52b9-9619-9b31f9647b96
title: "Alanwalton iOS"
slug: alanwalton-ios
domain-parent-slug: page-type/ios-app
required-reading-slugs:
  - repo/akasha-repo
app-slug: alanwalton
display-name: alanwalton
bundle-id: com.alanwalton.app
widget-bundle-id: com.alanwalton.app.widgets
development-team: M6AN6NM6FL
native-shell-repo-path: akasha:native-shell/alanwalton
capacitor-config-repo-path: akasha:native-shell/alanwalton/capacitor.config.json
shared-widget-repo-path: akasha:akasha/code-system/ios-component/ios-components
own-widget-repo-path: akasha:native-shell/alanwalton/ios-widget
seam-script: akasha:native-shell/alanwalton/scripts/apply-ios-seam.sh
sim-build-script: akasha:native-shell/alanwalton/scripts/build-sim.sh
entitlements-repo-path: akasha:native-shell/alanwalton/ios-app/App.entitlements
icon-repo-path: akasha:native-shell/alanwalton/ios-icon/AppIcon-1024.png
www-stage-script: akasha:native-shell/alanwalton/scripts/stage-app.sh
spa-source-repo-path: packages/alanwalton/web
web-env-path: packages/alanwalton/web/.env.local
asc-capabilities:
  - PUSH_NOTIFICATIONS
  - HEALTHKIT
app-profile-name: alanwalton app App Store
widget-profile-name: alanwalton widget App Store
mac-build-lock-dir: $HOME/.appstoreconnect/deploy-testflight.lock
mac-build-number-file: $HOME/.appstoreconnect/testflight-build-number
mac-www-staging-rel: .testflight-www-staging
default-device-udid: 00008130-000434AA22FA001C
---

# Definition

- **Alanwalton iOS** — the app on Alan's phone and the shell it runs in.

# Design

A simulator build runs on the MacBook, which is where `xcrun` and `simctl` stand.
