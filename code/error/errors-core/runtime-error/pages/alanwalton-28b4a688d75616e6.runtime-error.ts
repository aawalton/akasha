import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton28b4a688d75616e6 = {
  id: "01a13130-8b81-76ad-a0eb-0ba76a4e2ad5",
  type: "page-type/runtime-error",
  slug: "alanwalton-28b4a688d75616e6",
  fingerprint: "28b4a688d75616e6",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-read): story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/chapters/the-wandering-inn-0803-10-53-ueg.story-chapter-read.ts — read against `5ff7f32b61ccd65178e3cc00b872aeb904106066`, and what is at `5580f1240cf29ef6b8d7d1d0539c2cc02855ef1b` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-read/the-wandering-inn-0803-10-53-ueg-3097db3e",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  firstSeenAt: "2026-10-12T17:37:07.121Z",
  createdAt: "2026-10-12T17:37:07.457Z",
  updatedAt: "2026-10-12T17:37:07.457Z",
} as const satisfies RuntimeError
