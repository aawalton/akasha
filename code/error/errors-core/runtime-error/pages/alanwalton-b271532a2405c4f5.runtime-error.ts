import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonB271532a2405c4f5 = {
  id: "01a101cc-042f-74af-9116-4a28be05cc47",
  type: "page-type/runtime-error",
  slug: "alanwalton-b271532a2405c4f5",
  fingerprint: "b271532a2405c4f5",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0024-nine-hours.story-chapter-written.ts — read against `b7bf15d08f92381eaaa748c09df774f91db23275`, and what is at `92e5bd0e757e874b7acdf491049426a6bd5df520` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0024-nine-hours-5d9a5e1c",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T12:45:07.310Z",
} as const satisfies RuntimeError
