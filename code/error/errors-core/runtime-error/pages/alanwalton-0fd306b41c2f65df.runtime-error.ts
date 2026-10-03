import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton0fd306b41c2f65df = {
  id: "01a0ff11-b4d5-74f5-9887-a81891b36df9",
  type: "page-type/runtime-error",
  slug: "alanwalton-0fd306b41c2f65df",
  fingerprint: "0fd306b41c2f65df",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0016-whose-wanting.story-chapter-written.ts — read against `0c5dd87c4ad7b7daa98e71a7a13ba271fd7acc33`, and what is at `bc689d56b62c8937a682918d2bc03066493cf6a3` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0016-whose-wanting-9ff07560",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T00:02:24.024Z",
} as const satisfies RuntimeError
