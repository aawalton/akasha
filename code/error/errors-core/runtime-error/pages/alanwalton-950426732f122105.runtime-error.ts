import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton950426732f122105 = {
  id: "01a13190-ef11-7179-ac17-13933f90613f",
  type: "page-type/runtime-error",
  slug: "alanwalton-950426732f122105",
  fingerprint: "950426732f122105",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-read): story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/chapters/the-wandering-inn-0804-10-54-ueg-pt-1.story-chapter-read.ts — read against `50445472b0bfc9bc2363835a5f07f782640e42e6`, and what is at `8824cac8fe0cf5aecb6003a47678b28b0c8a5f66` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-read/the-wandering-inn-0804-10-54-ueg-pt-1-220420d0",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  firstSeenAt: "2026-10-12T19:22:23.856Z",
  createdAt: "2026-10-12T19:22:24.401Z",
  updatedAt: "2026-10-12T19:22:24.401Z",
} as const satisfies RuntimeError
