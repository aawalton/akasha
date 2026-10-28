import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonF297488cdd9cf0c6 = {
  id: "01a18334-8002-7e48-b0f6-1c9e0715b87b",
  type: "page-type/runtime-error",
  slug: "alanwalton-f297488cdd9cf0c6",
  fingerprint: "f297488cdd9cf0c6",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-chapter-played` was refused: `a composed query over `story-chapter-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-chapter-played","where":{"id":{"in":["01a17fd1-1208-7467-b95c-c1f3f4ede75a"]}},"keys":["id","outcomes","turnStarts"],"files":["outcomes"]}',
  url: "https://atlas.alanwalton.com/story-played/gifted-reborn-0aacf6e3",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:50:16.997Z",
  createdAt: "2026-10-28T15:50:18.369Z",
  updatedAt: "2026-10-28T15:50:18.369Z",
} as const satisfies RuntimeError
