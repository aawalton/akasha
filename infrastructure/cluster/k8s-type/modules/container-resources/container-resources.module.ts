import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const containerResources = {
  id: "01a0d5ab-53e9-72fe-a877-48e62669bc3e",
  type: "page-type/module",
  slug: "container-resources",
  definition: "the processor and memory a manifest's container asks for and is held to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers are read through the index from the manifest's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the page does not state is left out rather than written as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A whole number of processors is written in processors, and any other in thousandths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole number of gigabytes is written in gigabytes, and any other in megabytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A container other than the one the page names its numbers for states its own in code.",
    },
  ],
} as const satisfies Module
