import type { Command } from "@akasha/command-system/command"

export const mobileSimBoot = {
  id: "01a0685d-ceae-7006-9cff-358159094688",
  pageTypeSlug: "command",
  slug: "mobile-sim-boot",
  definition: "the command bringing up what the simulator is driven through",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--udid <udid>",
      takes: "the simulator to boot, the first booted or available iPhone where none is said",
    },
  ],
  helpNotes: [
    "this is the first call of a driving loop, and `mobile sim open-url` is the second.",
    "the Appium server on the mac is started only where it is down, so a second call costs nothing.",
    "a simulator already booted is left booted rather than restarted.",
    "the udid and the Appium base are given back, since the calls after this one are answered against them.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An Appium server already up is left up.",
    },
    {
      invariantKind: "departure",
      statement: "A simulator already booted is left booted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no simulator takes the first booted one, else the first iPhone there is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session or installs a build.",
    },
  ],
} as const satisfies Command
