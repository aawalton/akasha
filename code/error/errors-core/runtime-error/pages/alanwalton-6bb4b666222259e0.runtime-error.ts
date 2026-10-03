import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton6bb4b666222259e0 = {
  id: "01a0ff1b-45bd-7930-bd1c-b74f397c2bd8",
  type: "page-type/runtime-error",
  slug: "alanwalton-6bb4b666222259e0",
  fingerprint: "6bb4b666222259e0",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/hollowmere/stories/written/hollowmere/chapters/hollowmere-0016-whose-wanting.story-chapter-written.ts — read against `3799e2b64103c5ebf82003e819d5a188bb85052d`, and what is at `27a9af9adde779c02e88e5a716a8352dea14414d` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/hollowmere-0016-whose-wanting-9ff07560",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T00:12:48.284Z",
} as const satisfies RuntimeError
