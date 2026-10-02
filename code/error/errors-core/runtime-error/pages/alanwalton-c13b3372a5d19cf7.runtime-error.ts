import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonC13b3372a5d19cf7 = {
  id: "01a0ff0c-01ec-753b-a912-9b194bc0cea4",
  type: "page-type/runtime-error",
  slug: "alanwalton-c13b3372a5d19cf7",
  fingerprint: "c13b3372a5d19cf7",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0015-breathe-out.story-chapter-written.ts — read against `dd90bc5c8f0761c708655b4d3c0176b495b6fbda`, and what is at `311753ad89cab7d58ed70ce14eaa45847f40e880` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0015-breathe-out-6a2e051c",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-02T23:56:10.812Z",
} as const satisfies RuntimeError
