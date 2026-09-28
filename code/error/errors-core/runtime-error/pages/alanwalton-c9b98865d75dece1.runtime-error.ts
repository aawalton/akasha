import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC9b98865d75dece1 = {
  id: "01a0e944-d4ab-73cc-b630-9e8eaa1320f8",
  type: "page-type/runtime-error",
  slug: "alanwalton-c9b98865d75dece1",
  fingerprint: "c9b98865d75dece1",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-turn-played` was refused: `a composed query over `story-turn-played`` went unanswered: https://alanwalton.com/api/ask gave nothing back within 5000ms (TimeoutError: signal timed out) — 4 attempts were spent and nothing came back — the question was {"page-type":"story-turn-played","where":{"id":{"in":["01a0e817-d248-7ff8-ab6f-f1b874b2a9d7","01a0e81f-eacb-780f-9733-f45c4e027ae8","01a0e82b-7ba1-79db-b222-22e4fff95f64","01a0e839-56cd-70f4-a149-1aa4deeb7927","01a0e83e-83fb-7207-a6b4-37df704c314c","01a0e843-ed51-7a30-89b1-ffc79de768d2"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://alanwalton.com/story-played/otherwhere-dc918f7d?__v=124db0e2ab48048ea193e739f300c127c519e0dc",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-28T18:26:35.274Z",
} as const satisfies RuntimeError
