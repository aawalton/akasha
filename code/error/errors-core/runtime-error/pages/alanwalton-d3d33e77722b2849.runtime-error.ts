import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonD3d33e77722b2849 = {
  id: "01a0ea80-7d53-773b-9c3d-cb074135b2f7",
  type: "page-type/runtime-error",
  slug: "alanwalton-d3d33e77722b2849",
  fingerprint: "d3d33e77722b2849",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e9e1-6706-726c-a0af-a18c95e72ed4","01a0e9f1-31b2-7790-adbb-bbc195f510e9","01a0ea0e-2e28-7129-8f99-d24fefb062ea","01a0ea19-8b21-7aea-9f01-1b70c1341a40","01a0ea2a-ec90-7f09-8e85-378de47eb602","01a0ea37-506e-7a10-9404-76c29d65c543","01a0ea46-a941-741a-8981-afa0e7bdcd50","01a0ea56-887e-7614-8c68-e8d7c6737899","01a0ea70-1692-7517-86e2-9feeeb514bd1"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-iv-3d21651c",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-29T00:11:02.088Z",
} as const satisfies RuntimeError
