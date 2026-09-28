import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF4fcef206f721341 = {
  id: "01a0ea27-1b9d-739a-994b-89adb3c740d9",
  type: "page-type/runtime-error",
  slug: "alanwalton-f4fcef206f721341",
  fingerprint: "f4fcef206f721341",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-item` was refused: `a composed query over `story-item`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-item","where":{"character":{"ends-with":"/otherwhere-v-nala"}},"keys":["character","title","slot","description"]}',
  url: "https://alanwalton.com/story-played/otherwhere-v-1a2e1f89",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:33:31.978Z",
} as const satisfies RuntimeError
