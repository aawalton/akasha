import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton68287fe6f1bc5533 = {
  id: "01a10703-0782-77da-8022-098d1f01dc66",
  type: "page-type/runtime-error",
  slug: "alanwalton-68287fe6f1bc5533",
  fingerprint: "68287fe6f1bc5533",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-currency` was refused: `a composed query over `world-currency`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-currency","where":{"slug":{"in":["fairweather-coin"]}},"keys":["slug","title","denominations"]}',
  url: "https://alanwalton.com/story-chapter-written/fairweather-0001-the-leftovers-21d6f53e",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-10-04T13:03:19.551Z",
} as const satisfies RuntimeError
