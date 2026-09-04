import type { Command } from "@akasha/command-system/command"

export const mobileDeployDevice = {
  id: "01a0685d-ceae-7004-9388-865daf75f565",
  pageTypeSlug: "command",
  slug: "mobile-deploy-device",
  definition: "the command building an app on the mac and installing it to a phone plugged into it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--app <slug>", takes: "the app to build, the default app where none is said" },
    {
      said: "--device <udid>",
      takes: "the phone to install to, the one the app's page names where none is said",
    },
    { said: "--configuration <name>", takes: "the Xcode configuration, Debug where none is said" },
    {
      said: "--no-sync",
      takes: "build without syncing the native seam first, which is faster and reuses what stands",
    },
  ],
  helpNotes: [
    "this is the path onto a phone that is plugged into the mac, and TestFlight is the path onto every other phone.",
    "an app whose page names no phone is refused rather than installed to whichever phone is there.",
    "the mac checks out origin/main before it builds, so the install carries what is on main rather than what is here.",
    "the sync runs by default so the build reflects the site and the config as they stand.",
    "the signed app is checked to carry the app's bundle id and the app's team before it is installed.",
    "nothing is said until the build has finished, because a command prints nothing itself.",
    "the mac's login keychain is unlocked from `MACBOOK_KEYCHAIN_PASSWORD`, and a call without it is refused.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phone is named by its hardware udid.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose page names no phone is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "The build runs on the one mac this workstation reaches over ssh.",
    },
    {
      invariantKind: "departure",
      statement: "The commit built is origin/main rather than what this checkout stands at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A build is installed only where its signature carries the app's bundle id and team.",
    },
    {
      invariantKind: "departure",
      statement:
        "A build reporting no success and an install reporting no sentinel each count as nothing installed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here uploads to App Store Connect.",
    },
  ],
} as const satisfies Command
