import type { Module } from "@akasha/code-system/module"

export const simMacbook = {
  id: "01a05cee-e560-774c-8033-bd5fef37e8aa",
  pageTypeSlug: "module",
  slug: "sim-macbook",
  definition: "bringing appium and a booted simulator up on the remote macbook",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Appium is started detached and outlives the ssh connection that started Appium.",
    },
    {
      invariantKind: "departure",
      statement: "Appium's log on the macbook is written to one fixed path.",
    },
    {
      invariantKind: "departure",
      statement: "An already-booted simulator is preferred over the first available iPhone.",
    },
    {
      invariantKind: "departure",
      statement: "The udid is read out of simctl's JSON by python3 running on the macbook.",
    },
    {
      invariantKind: "constraint",
      statement: "build-sim.sh reports success by printing a BUILD_SIM_OK line carrying the udid.",
    },
  ],
} as const satisfies Module
