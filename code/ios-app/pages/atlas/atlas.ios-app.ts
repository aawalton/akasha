import type { IosApp } from "akasha/code/ios-app/ios-app.page-type.types.ts"

export const atlas = {
  id: "01a0655d-9450-7928-8cb9-55f5db90da07",
  type: "page-type/ios-app",
  slug: "atlas",
  definition: "Alan's app for reading his places and the shell holding it",
  appProfileName: "Atlas App Store",
  bundleId: "com.alanwalton.atlas",
  capacitorConfig: "json",
  cooldownSeconds: 3600,
  developmentTeam: "M6AN6NM6FL",
  displayName: "atlas",
  gitIgnore: "gitignore",
  macBuildLockDir: "$HOME/.appstoreconnect/deploy-testflight-atlas.lock",
  macBuildNumberFile: "$HOME/.appstoreconnect/testflight-build-number-atlas",
  marketingVersion: "1.0",
  nativeShellRepoPath: "akasha:code/ios-app/pages/atlas",
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
    "shell-script/atlas-ios-add",
    "shell-script/atlas-ios-seam",
  ],
} as const satisfies IosApp
