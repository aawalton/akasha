import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simMacbook = {
  id: "01a05cee-e560-774c-8033-bd5fef37e8aa",
  type: "page-type/module",
  slug: "sim-macbook",
  definition: "bringing appium and a booted simulator up on the remote macbook",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Appium is started detached and outlives the ssh connection that started Appium.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Appium's log on the macbook is written to one fixed path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An already-booted simulator is preferred over the first available iPhone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The udid is read out of simctl's JSON by python3 running on the macbook.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A simulator booted is named before the udid it booted is read back, which can fail.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An Appium server started is named before the wait for it to answer, which can time out.",
    },
  ],
} as const satisfies Module
