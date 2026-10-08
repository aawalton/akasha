import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const synthManifests = {
  id: "01a06810-0b68-7695-97a7-2d2f26274a9e",
  type: "page-type/module",
  slug: "synth-manifests",
  definition: "every generated manifest in a checkout written or checked against its synth",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout root is the folder the lockfile is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pass either writes or checks.",
    },
  ],
  createdAt: "2026-09-03T16:17:57.096Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
