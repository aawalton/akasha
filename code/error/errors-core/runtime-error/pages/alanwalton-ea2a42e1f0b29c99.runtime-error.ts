import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEa2a42e1f0b29c99 = {
  id: "01a0ea11-07f9-7db7-a579-b24416faab8d",
  type: "page-type/runtime-error",
  slug: "alanwalton-ea2a42e1f0b29c99",
  fingerprint: "ea2a42e1f0b29c99",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e9e4-d520-7bf3-bfd9-4832d1f53d1b","01a0e9f3-9f0f-7c47-ada5-1a3b4c957f2c","01a0ea04-8c6d-79e6-a576-e21c41f65380"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:09:38.731Z",
} as const satisfies RuntimeError
