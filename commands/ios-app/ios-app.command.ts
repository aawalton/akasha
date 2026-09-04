import type { Command } from "../../command-system/commands/command.page-type.ts"

export const iosApp = {
  id: "01a059ba-a798-7c72-b37c-b3b3cdfc33a9",
  pageTypeSlug: "command",
  slug: "ios-app",
  definition: "the command acting on the iOS apps akasha carries",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "build", takes: "the act, which is to build one app and install it on a simulator" },
    { said: "<app>", takes: "the app to build, which is the slug of an ios-app page" },
    { said: "--www <dir>", takes: "the site to install inside it, as some other build left it" },
  ],
  helpNotes: [
    "the act is the first word and the app is the second.",
    "one call names one app, and naming none or two is refused rather than guessed at.",
    "what an app is built from is read from its page rather than said here.",
    "a build needs Xcode, so a workstation that is not a mac hands it to one that is.",
    "nothing is said until the build has finished, because a command prints nothing itself.",
    "an app whose page names what stages its site has that site built here first.",
    "a build naming a site skips that staging and installs the site it was named.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word and the app is the second.",
    },
    {
      invariantKind: "departure",
      statement: "`build` is the only act there is.",
    },
    {
      invariantKind: "departure",
      statement: "One call names one app.",
    },
    {
      invariantKind: "departure",
      statement: "An app named more than once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "What an app is built from is read from its page.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation that is not a mac hands the build to one that is.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is reported until the build has finished.",
    },
    {
      invariantKind: "departure",
      statement: "An app's site is staged here before the tree reaches the mac.",
    },
    {
      invariantKind: "departure",
      statement: "A site handed in stands instead of the one the app's page would stage.",
    },
  ],
} as const satisfies Command
