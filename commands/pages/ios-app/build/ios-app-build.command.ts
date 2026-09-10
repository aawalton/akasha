import type { Command } from "../../../command.page-type.types.ts"

export const iosAppBuild = {
  id: "01a08cfb-0248-744a-b27f-bd776c527fca", pageTypeSlug: "command",
  type: "command",
  slug: "ios-app-build",
  definition: "the act building one iOS app and installing it on a simulator",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<app>", takes: "the app to build, which is the slug of an ios-app page" },
    { said: "--www <dir>", takes: "the site to install inside it, as some other build left it" },
  ],
  helpNotes: [
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
      statement: "One call names one app.",
    },
    {
      invariantKind: "departure",
      statement: "An app named more than once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The sources an app is built from are read from its page.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation that is not a mac hands the build to a mac.",
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
      statement: "A site handed in takes the place of the site the app's page would stage.",
    },
    {
      invariantKind: "departure",
      statement: "A site handed in reaches the mac beside the tree rather than inside it.",
    },
    {
      invariantKind: "absence",
      statement: "No app's web directory is delivered, since the mac builds that directory.",
    },
  ],
} as const satisfies Command
