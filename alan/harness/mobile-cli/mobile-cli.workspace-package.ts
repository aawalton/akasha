import type { WorkspacePackage } from "../../../code-system/workspace-packages/workspace-package.page-type.ts"

export const mobileCli = {
  id: "01a05cee-e560-7302-ad38-fd2e2a149eed",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "mobile-cli",
  definition: "the iOS work this workstation drives on a mac it reaches over ssh",
  manifest: "json",
  parts: [
    "page-type/mobile-cut",
    "module/mobile-app",
    "module/macbook-target",
    "module/ssh-delivery",
    "module/mobile-ssh",
    "module/git-tree-hash",
    "module/foundation",
    "module/ios-program-components",
    "module/ios-signing",
    "module/altool",
    "module/asc-client",
    "module/testflight-poll",
    "module/export-options-plist",
    "module/build-stamp-gate",
    "module/mac-build-serialization",
    "module/build-input-sources",
    "module/testflight-deploy-script",
    "module/cut-fingerprint",
    "module/local-cut-lock",
    "module/sim-run-tree",
    "module/sim-www-stage",
    "module/sim-auth",
    "module/sim-session",
    "module/appium-client",
    "module/sim-driver",
    "module/sim-macbook",
    "module/install-sim-shell",
    "module/push-tap-script",
    "module/www-build",
    "module/testflight-cut",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every build runs on the single mac this workstation reaches over ssh.",
    },
    {
      invariantKind: "departure",
      statement: "The sources a program compiles are read off that program's `ios-program` page.",
    },
    {
      invariantKind: "departure",
      statement: "The sources a TestFlight build was made from are remembered outside akasha.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compiles Swift.",
    },
    {
      invariantKind: "departure",
      statement: "An app on a phone is the build the last install put there.",
    },
    {
      invariantKind: "departure",
      statement: "The build on a phone can disagree with the build the server is already sending.",
    },
    {
      invariantKind: "departure",
      statement:
        "An install has every change already on main rather than the change that asked for the install.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing outside an app's page states a value that page has.",
    },
  ],
} as const satisfies WorkspacePackage
