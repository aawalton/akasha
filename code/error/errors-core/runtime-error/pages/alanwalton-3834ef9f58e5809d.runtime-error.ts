import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton3834ef9f58e5809d = {
  id: "01a0ea35-815d-7b6b-bd57-537a42da52eb",
  type: "page-type/runtime-error",
  slug: "alanwalton-3834ef9f58e5809d",
  fingerprint: "3834ef9f58e5809d",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e9e1-6706-726c-a0af-a18c95e72ed4","01a0e9f1-31b2-7790-adbb-bbc195f510e9","01a0ea0e-2e28-7129-8f99-d24fefb062ea","01a0ea19-8b21-7aea-9f01-1b70c1341a40","01a0ea2a-ec90-7f09-8e85-378de47eb602"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:49:08.201Z",
} as const satisfies RuntimeError
