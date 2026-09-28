import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton7ff926fed039da02 = {
  id: "01a0e998-2ad6-77bc-9d2e-3506b6eecf56",
  type: "page-type/runtime-error",
  slug: "alanwalton-7ff926fed039da02",
  fingerprint: "7ff926fed039da02",
  app: "alanwalton",
  kind: "react-render",
  message:
    "a filter this page type cannot read is refused: `story.following` reaches through the relation `story`, which is read on the pages it names before any filter runs",
  url: "https://alanwalton.com/story-chapter-read",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36",
  firstSeenAt: "2026-09-28T19:57:38.294Z",
} as const satisfies RuntimeError
