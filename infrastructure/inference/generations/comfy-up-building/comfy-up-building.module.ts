import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const comfyUpBuilding = {
  id: "01a0912a-249b-72ea-9e95-a346ca6e5c10",
  type: "module",
  slug: "comfy-up-building",
  definition: "what a ComfyUI script runs before its container starts",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folders a run reads and writes are made before anything is built.",
    },
    {
      invariantKind: "departure",
      statement: "The image is built only where podman holds no image under that name.",
    },
    {
      invariantKind: "departure",
      statement: "The recipe is named under the package folder the script found.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the index where a recipe sits.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names one generation.",
    },
  ],
} as const satisfies Module
