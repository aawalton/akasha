import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF436e3979e04b9c9 = {
  id: "01a0ea22-ec6f-7f66-893c-2daaf1789cba",
  type: "page-type/runtime-error",
  slug: "alanwalton-f436e3979e04b9c9",
  fingerprint: "f436e3979e04b9c9",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e9dc-d715-7c6b-9768-c90c38b9256e","01a0e9e2-0d21-7baa-a1ca-9cbdcbe28bac","01a0e9ee-e6ac-73f1-859c-b24892c89f29","01a0e9fb-75f6-7dbe-8bae-92883a935f3b","01a0ea0b-fb0b-7ace-a141-8f881a1ac7a2","01a0ea14-9066-789e-b1d2-32a69ef0debb"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iii-1fb8e002",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:29:03.837Z",
} as const satisfies RuntimeError
