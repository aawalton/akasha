import type { IosApp } from "@akasha/code-system/ios-app"

export const atlas = {
  id: "01a0655d-9450-7928-8cb9-55f5db90da07",
  pageTypeSlug: "ios-app",
  slug: "atlas",
  definition: "the app Alan reads his places in and the shell it runs in",
  manifest: "json",
  appProfileName: "Atlas App Store",
  bundleId: "com.alanwalton.atlas",
  capacitorConfig: "json",
  developmentTeam: "M6AN6NM6FL",
  displayName: "atlas",
  gitIgnore: "gitignore",
  macBuildLockDir: "$HOME/.appstoreconnect/deploy-testflight-atlas.lock",
  macBuildNumberFile: "$HOME/.appstoreconnect/testflight-build-number-atlas",
  marketingVersion: "1.0",
  nativeShellRepoPath: "akasha:native-shell/atlas",
  webEntry: "html",
  partSlugs: ["shell-script/atlas-capture-device-console", "shell-script/atlas-ios-seam"],
} as const satisfies IosApp
