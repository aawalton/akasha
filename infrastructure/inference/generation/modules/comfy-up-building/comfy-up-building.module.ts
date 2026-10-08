import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comfyUpBuilding = {
  id: "01a0912a-249b-72ea-9e95-a346ca6e5c10",
  type: "page-type/module",
  slug: "comfy-up-building",
  definition: "what a ComfyUI script runs before its container starts",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders a run reads and writes are made before anything is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is built only where podman holds no image under that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recipe is named under the package folder the script found.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the index where a recipe sits.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names one generation.",
    },
  ],
  createdAt: "2026-09-11T15:50:53.339Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
