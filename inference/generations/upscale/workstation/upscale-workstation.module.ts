import type { Module } from "@akasha/code/module"

export const upscaleWorkstation = {
  id: "01a0685d-4b35-7017-9e36-4673102a7874",
  pageTypeSlug: "module",
  type: "module",
  slug: "upscale-workstation",
  definition: "upscaling one image on the workstation's own GPU through the seedvr2 scripts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The scripts are reached at their pages' path rather than where the scripts were once installed.",
    },
    {
      invariantKind: "departure",
      statement: "The stack is brought up before an image is written into that stack.",
    },
    {
      invariantKind: "departure",
      statement:
        "A script that reports success while producing nothing readable is raised as a failure.",
    },
  ],
} as const satisfies Module
