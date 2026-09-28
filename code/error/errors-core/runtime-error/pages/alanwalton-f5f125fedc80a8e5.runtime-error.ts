import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF5f125fedc80a8e5 = {
  id: "01a0ea32-264a-729b-9aea-5235bc10f75d",
  type: "page-type/runtime-error",
  slug: "alanwalton-f5f125fedc80a8e5",
  fingerprint: "f5f125fedc80a8e5",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1d-18cf-7202-91ce-b2f8fa31d84d","01a0ea1f-d870-755a-a4ff-7417b35658e0"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vi-560058af",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:45:45.602Z",
} as const satisfies RuntimeError
