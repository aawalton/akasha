import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton358a28a5b9b18d49 = {
  id: "01a101cb-4128-7090-b6ca-7a2ccbb7813a",
  type: "page-type/runtime-error",
  slug: "alanwalton-358a28a5b9b18d49",
  fingerprint: "358a28a5b9b18d49",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0024-nine-hours.story-chapter-written.ts — read against `df6818d5165307e660159bf9c642928b9188e30d`, and what is at `c357b9ef2316c237203da8316106a9cc0335dc1d` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0024-nine-hours-5d9a5e1c",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T12:44:19.599Z",
} as const satisfies RuntimeError
