import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationCaptureClient = {
  id: "01a06582-6b30-7bd3-9a85-c6ccf0abc52e",
  type: "page-type/module",
  slug: "location-capture-client",
  definition: "the background location capture the phone runs and flushes to the ingest route",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved buffer starts capture with every valid point it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A saved buffer that is unreadable or refuses a point is first copied whole to a key of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That copy is logged with how many points were refused and why.",
    },
  ],
} as const satisfies Module
