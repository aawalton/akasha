import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1a84a3077a29d075 = {
  id: "01a0fe94-a37a-7c5e-836e-a773675fd28a",
  type: "page-type/runtime-error",
  slug: "alanwalton-1a84a3077a29d075",
  fingerprint: "1a84a3077a29d075",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0011-clothed-to-start.story-chapter-written.ts — read against `231b266a0c33f3b3f08b39ee7c0ddf6447784146`, and what is at `7d9ac1a571dff14d5bc5a7b09d5184d14929c856` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0011-clothed-to-start-9bece8f3",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T21:45:46.817Z",
} as const satisfies RuntimeError
