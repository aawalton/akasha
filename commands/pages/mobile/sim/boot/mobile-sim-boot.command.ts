import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimBoot = {
  id: "01a0685d-ceae-7006-9cff-358159094688",
  type: "command",
  slug: "mobile-sim-boot",
  definition: "the command booting a simulator and starting the Appium server it is driven through",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer carries the simulator's udid and the Appium base.",
    },
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
        "A call naming no simulator takes the first booted simulator or the first iPhone there is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session or installs a build.",
    },
  ],
  name: "boot",
  arguments: [{ argument: "argument/udid" }],
} as const satisfies Command
