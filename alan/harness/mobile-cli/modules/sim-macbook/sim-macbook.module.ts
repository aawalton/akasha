import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simMacbook = {
  id: "01a05cee-e560-774c-8033-bd5fef37e8aa",
  type: "page-type/module",
  slug: "sim-macbook",
  definition: "how code starts Appium and a simulator on Alan's MacBook",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Appium is started detached and outlives the ssh connection that started Appium.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Appium's log on the macbook is written to one fixed path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An already-booted simulator is preferred over the first available iPhone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The udid is read out of simctl's JSON by python3 running on the macbook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A simulator booted is named before the udid it booted is read back, which can fail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An Appium server started is named before the wait for it to answer, which can time out.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:28:44.290Z",
} as const satisfies Module
