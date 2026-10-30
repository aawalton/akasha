import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE88268a223f47a99 = {
  id: "01a18db0-bcc2-778f-a958-ef7f5600e9a8",
  type: "page-type/runtime-error",
  slug: "alanwalton-e88268a223f47a99",
  fingerprint: "e88268a223f47a99",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-chapter-played` was refused: `a composed query over `story-chapter-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-chapter-played","where":{"id":{"in":["01a18dab-06cd-70d2-af24-41c7b723dc8c","01a18dab-06cd-7f39-a5ec-691a8a80cd98"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/gifted-trial2-caf64e1a",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.8037.0 Safari/537.36",
  firstSeenAt: "2026-10-30T16:41:55.770Z",
  createdAt: "2026-10-30T16:42:12.545Z",
  updatedAt: "2026-10-30T16:42:12.545Z",
} as const satisfies RuntimeError
