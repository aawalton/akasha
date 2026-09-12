import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimBoot = {
  id: "01a0685d-ceae-7006-9cff-358159094688",
  type: "command",
  slug: "mobile-sim-boot",
  definition: "the command booting a simulator and starting the Appium server it is driven through",
  code: "ts",
  test: "ts",
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
      statement: "An Appium server this started is named as soon as that server is up.",
    },
    {
      invariantKind: "departure",
      statement: "A boot that threw after starting Appium names that start in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The readiness, the starting and the booting are handed in.",
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
