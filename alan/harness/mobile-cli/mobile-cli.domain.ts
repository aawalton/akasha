import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mobileCli = {
  id: "01a05cee-e560-7302-ad38-fd2e2a149eed",
  type: "page-type/domain",
  slug: "mobile-cli",
  definition: "how programs for Alan's phone are built",
  parts: [
    "module/altool",
    "module/appium-client",
    "module/asc-client",
    "module/build-input-sources",
    "module/build-stamp-gate",
    "module/cut-fingerprint",
    "module/export-options-plist",
    "module/foundation",
    "module/git-tree-hash",
    "module/ios-program-components",
    "module/ios-signing",
    "module/local-cut-lock",
    "module/mac-build-serialization",
    "module/macbook-target",
    "module/mobile-app",
    "module/mobile-ssh",
    "module/push-tap-script",
    "module/sim-driver",
    "module/sim-macbook",
    "module/sim-run-tree",
    "module/sim-session",
    "module/ssh-delivery",
    "module/testflight-cut",
    "module/testflight-deploy-script",
    "module/testflight-poll",
    "page-type/mobile-cut",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every build runs on the single mac this workstation reaches over ssh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to how an app is built is proved by `akasha deploy <app> --simulator`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That run needs no phone, no signing and no App Store Connect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent at this workstation runs it rather than asking Alan to run it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A TestFlight build is made by an agent at this workstation rather than by Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many commits a build carries is no reason to put that build to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A simulator run is delivered a few folders rather than a checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sources a program compiles are read off that program's `ios-program` page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sources a TestFlight build was made from are remembered outside akasha.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here compiles Swift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app on a phone is the build the last install put there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build on a phone can disagree with the build the server is already sending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An install has every change already on main rather than the change that asked for the install.",
    },
  ],
} as const satisfies Domain
