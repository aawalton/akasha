import type { IosApp } from "akasha/code/ios-apps/ios-app.page-type.types.ts"

export const atlas = {
  id: "01a0655d-9450-7928-8cb9-55f5db90da07",
  type: "ios-app",
  slug: "atlas",
  definition: "the app Alan reads his places in and the shell it runs in",
  appProfileName: "Atlas App Store",
  bundleId: "com.alanwalton.atlas",
  capacitorConfig: "json",
  developmentTeam: "M6AN6NM6FL",
  displayName: "atlas",
  gitIgnore: "gitignore",
  macBuildLockDir: "$HOME/.appstoreconnect/deploy-testflight-atlas.lock",
  macBuildNumberFile: "$HOME/.appstoreconnect/testflight-build-number-atlas",
  marketingVersion: "1.0",
  nativeShellRepoPath: "akasha:code/ios-apps/pages/atlas",
  syncScript: "shell-script/atlas-ios-add",
  toolReached: [
    "@capacitor/cli",
    "@capacitor/core",
    "@capacitor/ios",
    "@capacitor/preferences",
    "@capgo/background-geolocation",
  ],
  webDirectory: true,
  webEntry: "html",
  parts: [
    "shell-script/atlas-capture-device-console",
    "shell-script/atlas-ios-seam",
    "shell-script/atlas-ios-add",
  ],
} as const satisfies IosApp
