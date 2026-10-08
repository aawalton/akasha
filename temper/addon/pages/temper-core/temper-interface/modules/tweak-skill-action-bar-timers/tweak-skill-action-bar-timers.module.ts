import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakSkillActionBarTimers = {
  id: "01a06115-1ad5-7d01-8cc1-694928184aab",
  type: "page-type/module",
  slug: "tweak-skill-action-bar-timers",
  definition: "the countdown text the interface tweaks draw on an action slot",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.213Z",
  updatedAt: "2026-09-22T06:38:56.000Z",
} as const satisfies Module
