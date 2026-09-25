import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deploySimulatorInstalling = {
  id: "01a08e07-611c-798a-bc99-55b321247e50",
  type: "page-type/module",
  slug: "deploy-simulator-installing",
  definition: "an iOS app built on the mac and installed on a simulator there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sources an app is built from are read from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app is built at the commit it is handed rather than from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The app's page and every page it names are read from the pages that commit holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files delivered are written out of that commit into a scratch folder first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is taken away once the build has finished or thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is stamped with that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation that is not a mac hands the build to a mac.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No app's web directory is delivered, since the mac builds that directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build reporting no sentinel counts as nothing installed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delivered tree's root is named to the build, since the shell sits under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the build installs is the range each package the app's page reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The script making an app's native sources is named to the build by its path.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing the build says is reported until the build has finished.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing this writes is named as soon as that thing reaches a machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw part way names those things in its refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that refused part way names them as a run that threw does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The running this does is handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here uploads to App Store Connect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plugins the build compiles in are the packages the app's page reaches.",
    },
  ],
} as const satisfies Module
