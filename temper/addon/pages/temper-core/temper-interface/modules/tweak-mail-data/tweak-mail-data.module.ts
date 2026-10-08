import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakMailData = {
  id: "01a06115-1acc-7d0b-a919-d0ba8caa2953",
  type: "page-type/module",
  slug: "tweak-mail-data",
  definition: "what the interface tweaks keep about a mail",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.204Z",
  updatedAt: "2026-09-22T10:09:10.000Z",
} as const satisfies Module
