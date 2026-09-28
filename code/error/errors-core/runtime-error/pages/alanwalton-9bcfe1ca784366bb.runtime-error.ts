import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton9bcfe1ca784366bb = {
  id: "01a0ea12-76a1-7663-a0ad-091329a36a6b",
  type: "page-type/runtime-error",
  slug: "alanwalton-9bcfe1ca784366bb",
  fingerprint: "9bcfe1ca784366bb",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e985-4ff0-7640-8da4-15041292f7c1","01a0e988-3891-7a73-840e-807fe03e944c","01a0e9a0-71ff-7481-bc59-9e1026e5af9e","01a0e9c2-63e9-793d-ab41-e87c388cc7ea","01a0e9cb-c436-7e7d-996a-313ced3b05a5","01a0e9d3-e94f-78dd-9bd6-146edaf7813f","01a0e9da-5202-7077-9fdd-b564f5759119","01a0e9fd-ea3e-752d-9a90-d55f1a2c6364"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-e803aae9",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T22:11:12.461Z",
} as const satisfies RuntimeError
