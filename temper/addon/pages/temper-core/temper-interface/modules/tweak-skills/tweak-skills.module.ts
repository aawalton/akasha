import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakSkills = {
  id: "01a06115-1ad6-704a-ac3c-88cccb76abc5",
  type: "page-type/module",
  slug: "tweak-skills",
  definition: "the skills window the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
