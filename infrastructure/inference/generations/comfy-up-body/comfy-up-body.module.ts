import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const comfyUpBody = {
  id: "01a09137-9598-7e34-814d-cf5126c347b6",
  type: "module",
  slug: "comfy-up-body",
  definition: "the one body every ComfyUI up script is written from",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What tells one generation from another is a value handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The name a generation goes by gives its image, its container and its folder.",
    },
    {
      invariantKind: "departure",
      statement: "That name in capitals gives the variables a caller overrides those by.",
    },
    {
      invariantKind: "departure",
      statement: "The port a generation answers on is the port inside the container too.",
    },
    {
      invariantKind: "departure",
      statement: "A generation with a script that proves the GPU closes by naming that script.",
    },
    {
      invariantKind: "departure",
      statement: "A generation with none closes by naming its folder alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A folder two containers both mount is relabelled shared rather than private.",
    },
    {
      invariantKind: "departure",
      statement: "Every generation relabels the same way, so the relabel is no value handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the index where a recipe sits.",
    },
  ],
} as const satisfies Module
