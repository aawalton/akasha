import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton713efe8946d1e32e = {
  id: "01a10189-4fbf-7faf-8342-3887cd5cb807",
  type: "page-type/runtime-error",
  slug: "alanwalton-713efe8946d1e32e",
  fingerprint: "713efe8946d1e32e",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-written): story/world/pages/emberdeep/stories/written/emberdeep/chapters/emberdeep-0001-three-is-a-party.story-chapter-written.ts — read against `8b900718a0b464c05b193faa387eb0eb6ce3a900`, and what is at `6656e547b16ce44b88952ab85485c5a3606477e4` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-written/emberdeep-0001-three-is-a-party-f159b266",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-03T11:32:17.222Z",
} as const satisfies RuntimeError
