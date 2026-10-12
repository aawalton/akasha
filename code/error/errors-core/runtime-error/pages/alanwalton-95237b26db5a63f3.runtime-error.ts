import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton95237b26db5a63f3 = {
  id: "01a13193-bd0c-7345-862e-5954f66355ac",
  type: "page-type/runtime-error",
  slug: "alanwalton-95237b26db5a63f3",
  fingerprint: "95237b26db5a63f3",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-read): story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/chapters/the-wandering-inn-0804-10-54-ueg-pt-1.story-chapter-read.ts — read against `cfaad9f63305132861b1f641ca51bd0bcfc35974`, and what is at `f858d03de93111ce6246902fa1512062a9a0a55a` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-read/the-wandering-inn-0804-10-54-ueg-pt-1-220420d0",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  firstSeenAt: "2026-10-12T19:25:27.504Z",
  createdAt: "2026-10-12T19:25:28.204Z",
  updatedAt: "2026-10-12T19:25:28.204Z",
} as const satisfies RuntimeError
