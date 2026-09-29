import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton9b076b72813c54f5 = {
  id: "01a0ea76-a455-7656-a4fd-9e3f031c0221",
  type: "page-type/runtime-error",
  slug: "alanwalton-9b076b72813c54f5",
  fingerprint: "9b076b72813c54f5",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0ea1d-df17-770b-abb6-857b9d17fa12","01a0ea21-6f9d-71b9-921d-f759c9443e7b","01a0ea43-56c6-7111-a82e-6292a39224f6","01a0ea51-412d-7b89-ac19-0a6ce200afd7","01a0ea5b-f57b-7715-a48e-bcb3dc00bd05"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-vii-65d13de2?__v=f6a1d7eba7119174b126d912850cc7fb34880c99",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:00:28.453Z",
} as const satisfies RuntimeError
