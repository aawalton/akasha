import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistImage = {
  id: "01a0685d-4b35-7013-8853-9ed4e36a99e3",
  type: "page-type/module",
  slug: "persist-image",
  definition: "the image page a generate, edit or upscale run lands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a generate or edit or upscale run lands an image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The picture is landed as every picture is, by `picture-landing`, as the inference CLI.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page landed states how the run made it, as `image-making` works that out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture whose page is there already keeps what that page states.",
    },
  ],
} as const satisfies Module
