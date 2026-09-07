import type { Module } from "@akasha/code/module"

export const supervisorInteractiveBootContract = {
  id: "01a06871-3115-7004-85f9-3b541e6a385e",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-boot-contract",
  definition: "what a seat's interactive boot is asked for and what it hands back",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here holds behaviour.",
    },
    {
      invariantKind: "departure",
      statement: "Every export is a type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The boot's answer names the credential subsystem's parts rather than the subsystem.",
    },
    {
      invariantKind: "upkeep",
      statement: "A new thing the boot returns is stated here before the boot returns that thing.",
    },
  ],
} as const satisfies Module
