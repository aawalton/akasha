import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonEdeb25810753be0e = {
  id: "01a18336-3e13-7a06-a50c-9df2ffc00928",
  type: "page-type/runtime-error",
  slug: "alanwalton-edeb25810753be0e",
  fingerprint: "edeb25810753be0e",
  app: "alanwalton",
  kind: "error",
  message:
    'the play screen\'s question over `story-chapter-played` was refused: `a composed query over `story-chapter-played`` answered with what is not JSON (SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON) — one attempt was spent — the question was {"page-type":"story-chapter-played","where":{"id":{"in":["01a17ec9-0e87-79a4-b56e-f4b25dc133f5","01a17f2f-c0dd-7e88-a4ff-2bd62fc7cc3c","01a17f4e-99a3-713b-82d3-08291e64c7da","01a17fc0-3d47-799c-bcca-a64eecf74517","01a17fcf-1418-7ada-9b69-b04e26dc3e97"]}},"keys":["id","prose"],"files":["prose"]}',
  url: "https://atlas.alanwalton.com/story-played/test-story-d77942c2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-10-28T15:52:11.076Z",
  createdAt: "2026-10-28T15:52:12.562Z",
  updatedAt: "2026-10-28T15:52:12.562Z",
} as const satisfies RuntimeError
