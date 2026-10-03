import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEe0a199f58dcff29 = {
  id: "01a0ff77-0e13-71bd-8c93-69efc2a9cf99",
  type: "page-type/runtime-error",
  slug: "alanwalton-ee0a199f58dcff29",
  fingerprint: "ee0a199f58dcff29",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `world-currency` was refused: `a composed query over `world-currency`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TypeError: Load failed) — 4 attempts were spent and nothing came back — the question was {"page-type":"world-currency","where":{"slug":{"in":["overwhere-iv-coin"]}},"keys":["slug","title","denominations"]}',
  url: "https://alanwalton.com/story-played/overwhere-iv-f286ba0f?__v=c68bbf34e0672634da40d3388f5da48a1acdcb66",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T01:53:06.018Z",
} as const satisfies RuntimeError
