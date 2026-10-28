import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0f6a920a14a115e6 = {
  id: "01a18334-8001-755d-8231-be9fd84ad29a",
  type: "page-type/runtime-error",
  slug: "alanwalton-0f6a920a14a115e6",
  fingerprint: "0f6a920a14a115e6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-chapter-played` was refused: `a composed query over `story-chapter-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-chapter-played","where":{"id":{"in":["01a17fd1-1208-7467-b95c-c1f3f4ede75a"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:16.971Z",
  createdAt: "2026-10-28T15:50:18.369Z",
  updatedAt: "2026-10-28T15:50:18.369Z",
} as const satisfies RuntimeError
