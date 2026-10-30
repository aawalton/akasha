import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadHeld = {
  id: "01a0de39-997f-7b79-bb3d-5d29d2b906dc",
  type: "page-type/module",
  slug: "royal-road-held",
  definition: "how code finds the pages that hold chapters from Royal Road",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter already held is known by its royal road id rather than by its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter stating no royal road id is known by the id its link has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter already held is held whatever story that chapter names, or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages holding one royal road chapter are one page and a second copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The copy kept is one holding words, and of those the one filed first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty answer about the chapters held refuses the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter held is gathered under the story it names with its length, progress and day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second copy is gathered under no story.",
    },
  ],
  createdAt: "2026-09-26T14:58:31.935Z",
  updatedAt: "2026-10-30T15:22:40.078Z",
} as const satisfies Module
