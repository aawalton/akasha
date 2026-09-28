import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonA2173f00358d0771 = {
  id: "01a0ea22-ec6f-7171-bf53-a045f47e0324",
  type: "page-type/runtime-error",
  slug: "alanwalton-a2173f00358d0771",
  fingerprint: "a2173f00358d0771",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e9e1-6706-726c-a0af-a18c95e72ed4","01a0e9f1-31b2-7790-adbb-bbc195f510e9","01a0ea0e-2e28-7129-8f99-d24fefb062ea"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:29:02.487Z",
} as const satisfies RuntimeError
