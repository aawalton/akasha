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
      workingMemory:
        "No verdict is written anywhere for FLUX.1 Fill dev, LivePortrait expression edits or PuLID-Flux alone; all three were removed on 2026-06-21 with the other local editors. Session transcripts on the workstation start 2026-08-26, so June and July verdicts survive only in commit messages of the old code repo.",
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
        "Every service tried for reading a picture is named on image-intelligence with how it fell short.",
    },
    {
      statement:
        "image-edit names the best open-weight way to edit a picture of a person on each machine.",
    },
    {
      statement:
        "image-upscale names the best open-weight way to upscale a picture of a person on each machine.",
    },
    {
      statement:
        "image-generation names the best open-weight way to make a picture of a person on each machine.",
    },
    {
      statement:
        "image-intelligence names the best open-weight way to read a picture on each machine.",
      workingMemory:
        "Read off a picture: persona, relationship-level (the closeness rung, its maturity rating), subjects, and a free tag list per facet that the agent then folds. Rungs 5 and 6 need a model that never refuses. Persona is matched by face embedding against her anchor. Candidates: Qwen3.6-35B-A3B uncensored on the 5080 via llama.cpp, Qwen3.8-27B on the Macs, JoyCaption Beta One for captions, ArcFace with AdaFace for persona.",
    },
  ],
  constraints: [
    "The machines are the RTX 5080 workstation, the 64GB M1 Max MacBook Pro and a future 512GB Mac Studio.",
    "A model that makes or changes a picture is judged first on how well it keeps a person's likeness.",
    "Only a model that runs on local hardware is recommended.",
  ],
} as const satisfies Initiative
