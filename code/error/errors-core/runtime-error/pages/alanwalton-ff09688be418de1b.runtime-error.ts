import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonFf09688be418de1b = {
  id: "01a0ea4f-ea5f-74a9-8a1a-dc45e23ab148",
  type: "page-type/runtime-error",
  slug: "alanwalton-ff09688be418de1b",
  fingerprint: "ff09688be418de1b",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e817-d248-7ff8-ab6f-f1b874b2a9d7","01a0e81f-eacb-780f-9733-f45c4e027ae8","01a0e82b-7ba1-79db-b222-22e4fff95f64","01a0e839-56cd-70f4-a149-1aa4deeb7927","01a0e83e-83fb-7207-a6b4-37df704c314c","01a0e843-ed51-7a30-89b1-ffc79de768d2","01a0e930-9268-7437-8b3f-8e03e2500a0c","01a0e948-cd15-78cb-b953-8e9dc8bc0d1f"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-i-dc918f7d",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T23:18:19.867Z",
} as const satisfies RuntimeError
