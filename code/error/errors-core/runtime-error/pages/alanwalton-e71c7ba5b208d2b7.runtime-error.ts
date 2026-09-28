import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE71c7ba5b208d2b7 = {
  id: "01a0e944-3248-77d5-b406-94be6d6f0e1f",
  type: "page-type/runtime-error",
  slug: "alanwalton-e71c7ba5b208d2b7",
  fingerprint: "e71c7ba5b208d2b7",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e574-c321-79ef-a4d7-09f74c16e5f4","01a0e57c-635e-769a-87a1-d128d8c653c4","01a0e584-562f-7e6b-9595-c7b4a7d9bb46","01a0e58a-4776-7960-a688-ad0ad2f46093","01a0e58f-c615-750f-a220-4668d84aa41c","01a0e595-41ae-73c5-8732-c19e5aa98e86","01a0e59b-5001-754e-9cf5-132d763fb236","01a0e7fb-1d4a-75c1-920c-d9732b54ca83","01a0e807-ac72-7edc-9d3f-e9476f896a1a","01a0e80d-92b9-7594-a0fc-7015420de3f5","01a0e815-225f-7d34-9b15-ce15b713720f","01a0e81a-4a1e-7e53-99e7-3c211c8935e4","01a0e821-5526-7db4-81e3-279525dd6096","01a0e828-d5f3-740f-a947-4c0188cfcf9e","01a0e82e-b09b-7661-a482-b794fdc08b54","01a0e837-3293-7d7b-ad6c-134bbcd04ea5","01a0e83c-52ff-7bd9-8d0b-af8ff7bebf75","01a0e841-9406-73cd-9d79-6e1229b96c3c","01a0e848-4c03-75bb-ad50-459160211267","01a0e853-1e55-74a6-b08e-4464b8d65e1b"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/the-dating-game-e09c8244?__v=bab7fdc518545b2cf535e6bbaf8704806a359bed",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T18:25:55.178Z",
} as const satisfies RuntimeError
