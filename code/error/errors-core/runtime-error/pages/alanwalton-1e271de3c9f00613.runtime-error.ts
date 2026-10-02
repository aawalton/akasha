import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton1e271de3c9f00613 = {
  id: "01a0ff0d-ee19-7489-982f-e075512a37ef",
  type: "page-type/runtime-error",
  slug: "alanwalton-1e271de3c9f00613",
  fingerprint: "1e271de3c9f00613",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0016-whose-wanting.story-chapter-written.ts — read against `ef1e6b1ecdf0c798591c2124e720dc3d8c64dbef`, and what is at `bb5c784ca4a693ae1fbd265372e3effcdd601fc8` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0016-whose-wanting-9ff07560",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T23:58:17.522Z",
} as const satisfies RuntimeError
