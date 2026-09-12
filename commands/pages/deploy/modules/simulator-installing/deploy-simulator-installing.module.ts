import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deploySimulatorInstalling = {
  id: "01a08e07-611c-798a-bc99-55b321247e50",
  type: "module",
  slug: "deploy-simulator-installing",
  definition: "one iOS app built on the mac and installed on a simulator there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sources an app is built from are read from its page.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation that is not a mac hands the build to a mac.",
    },
    {
      invariantKind: "departure",
      statement: "An app's site is staged here before the tree reaches the mac.",
    },
    {
      invariantKind: "departure",
      statement: "No app's web directory is delivered, since the mac builds that directory.",
    },
    {
      invariantKind: "departure",
      statement: "A build reporting no sentinel counts as nothing installed.",
    },
    {
      invariantKind: "departure",
      statement: "The delivered tree's root is named to the build, since the shell sits under it.",
    },
    {
      invariantKind: "departure",
      statement: "What the build installs is the range each package the app's page reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The script making an app's native sources is named to the build by its path.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing the build says is reported until the build has finished.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing this writes is named as soon as that thing reaches a machine.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw part way names those things in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A run that refused part way names them as a run that threw does.",
    },
    {
      invariantKind: "departure",
      statement: "The running this does is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here uploads to App Store Connect.",
    },
    {
      invariantKind: "departure",
      statement: "The plugins the build compiles in are the packages the app's page reaches.",
    },
  ],
} as const satisfies Module
