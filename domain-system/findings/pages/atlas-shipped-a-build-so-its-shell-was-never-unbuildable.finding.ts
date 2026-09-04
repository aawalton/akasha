import type { Finding } from "../finding.page-type.ts"

export const atlasShippedABuildSoItsShellWasNeverUnbuildable = {
  id: "01a0657e-994a-7489-b438-bba26c1b9ba7",
  pageTypeSlug: "finding",
  slug: "atlas-shipped-a-build-so-its-shell-was-never-unbuildable",
  domainSlug: "domain/akasha-migration",
  claim:
    "The call to drop atlas rather than move it rested on a misreading. `native-shell/atlas/ios` was absent because it is generated and git-ignored, not because no checkout could build it, and App Store Connect shows atlas shipped a build. atlas moved into akasha as an ios-app page instead of being dropped.",
  evidence:
    "The earlier finding read `ls native-shell/atlas/ios` answering nothing as proof that no checkout had ever built atlas. `native-shell/atlas/.gitignore` lines 5-7 read `# Capacitor-generated native project (regenerated from package.json + capacitor.config.json).` then `ios/` and `android/`. The directory is output of `cap add ios`, which the package's own `ios:add` script runs, so its absence from a fresh checkout is the design rather than a defect.\n\nThe refutation at its own scope is the finding an-upload-to-testflight-is-a-delivery-to-a-phone, read live from the App Store Connect API on the same day: `com.alanwalton.atlas` (6786008288) carries an `Internal` beta group with 1 tester `INSTALLED` and build 1 in that group's build list. A build that reached a tester's phone was built.\n\nSo atlas is a third shipped app rather than an invention. It landed at akasha/code-system/ios-apps/pages/atlas as `atlas.ios-app.ts` with its capacitor config, web entry, gitignore and manifest beside it and two shell scripts under `scripts/`, modelled on smilingjenny, whose shape it matches: a local `www` entry redirecting to the live site, no `spa-source-path`. `bundle-id` is `com.alanwalton.atlas`, taken from the App Store Connect read rather than guessed. `native-shell/atlas` and its root `workspaces` row are gone.\n\nLeft behind for whoever owns the old pages: `pages/ios-app/atlas-ios.ios-app.md` still carries `native-shell-repo-path: akasha:native-shell/atlas`, a path that no longer exists.",
} as const satisfies Finding
