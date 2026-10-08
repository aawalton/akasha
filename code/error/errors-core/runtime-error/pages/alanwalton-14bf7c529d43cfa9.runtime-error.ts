import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton14bf7c529d43cfa9 = {
  id: "01a11b94-07e0-7751-89cd-ae15cd5cd1b5",
  type: "page-type/runtime-error",
  slug: "alanwalton-14bf7c529d43cfa9",
  fingerprint: "14bf7c529d43cfa9",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/encounters/stories/written/encounters/chapters/encounters-0002-eleven.story-chapter-written.ts — read against `d6c0ec7977c96ba3f794a447a201283589e25010`, and what is at `a26c3c826cc45c749f3ec79d23019990b21170a4` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/encounters-0002-eleven-ec1b5225",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-08T12:54:08.349Z",
} as const satisfies RuntimeError
