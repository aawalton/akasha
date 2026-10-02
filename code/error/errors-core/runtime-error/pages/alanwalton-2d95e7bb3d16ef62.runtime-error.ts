import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton2d95e7bb3d16ef62 = {
  id: "01a0fe8a-474f-72e3-8c1e-59e86e6bbfcd",
  type: "page-type/runtime-error",
  slug: "alanwalton-2d95e7bb3d16ef62",
  fingerprint: "2d95e7bb3d16ef62",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0011-clothed-to-start.story-chapter-written.ts — read against `e73763278df09720bc95de755338faac9752b49d`, and what is at `b5836012594bed319e23c456bc9ea25b26253c9a` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0011-clothed-to-start-9bece8f3",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T21:34:25.371Z",
} as const satisfies RuntimeError
