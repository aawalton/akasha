import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueLocalImage = {
  id: "01a0de70-74ad-73ad-9ffd-f1d042fd2e4c",
  type: "page-type/initiative",
  slug: "nimue-local-image",
  domain: "domain/image",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "Every service tried for changing a picture is named on image-edit with how it fell short.",
    },
    {
      statement:
        "Every service tried for upscaling a picture is named on image-upscale with how it fell short.",
    },
    {
      statement:
        "Every service tried for making a picture is named on image-generation with how it fell short.",
    },
    {
      statement:
        "The best open-weight way to edit a picture of a person is named for the RTX 5080.",
    },
    {
      statement:
        "The best open-weight way to edit a picture of a person is named for a 512GB Mac Studio.",
    },
    {
      statement:
        "The best open-weight way to upscale a picture of a person is named for the RTX 5080.",
    },
    {
      statement:
        "The best open-weight way to upscale a picture of a person is named for a 512GB Mac Studio.",
    },
    {
      statement:
        "The best open-weight way to generate a picture of a person is named for the RTX 5080.",
    },
    {
      statement:
        "The best open-weight way to generate a picture of a person is named for a 512GB Mac Studio.",
    },
  ],
  constraints: [
    "A model is judged first on how well it keeps a person's likeness.",
    "Only a model that runs on local hardware is recommended.",
  ],
} as const satisfies Initiative
