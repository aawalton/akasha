import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const upscaleWorkstation = {
  id: "01a0685d-4b35-7017-9e36-4673102a7874",
  type: "page-type/module",
  slug: "upscale-workstation",
  definition: "upscaling an image on the workstation's own GPU through the seedvr2 scripts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scripts are reached at their pages' path rather than where the scripts were once installed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stack is brought up before an image is written into that stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A script that reports success while producing nothing readable is raised as a failure.",
    },
  ],
} as const satisfies Module
