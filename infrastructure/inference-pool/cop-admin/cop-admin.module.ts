import type { Module } from "@akasha/code-system/module"

export const copAdmin = {
  id: "01a0685d-4b35-700b-a3ee-538f05dcbe5d",
  pageTypeSlug: "module",
  slug: "cop-admin",
  definition: "asking the traffic cop which service is resident and telling it to swap",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The admin port is reached from the host over ssh rather than across the network.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cop that answers something other than what is expected is raised as an operational failure.",
    },
  ],
} as const satisfies Module
