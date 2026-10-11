import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwalton17c3b287e8b46ecf = {
  id: "01a128ac-8183-78c2-afc4-bf4706fe9bdb",
  type: "page-type/runtime-error",
  slug: "alanwalton-17c3b287e8b46ecf",
  fingerprint: "17c3b287e8b46ecf",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "patchPage: the write was refused — patchPage(story-chapter-read): story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/chapters/the-wandering-inn-0793-10-47-s-pt-1.story-chapter-read.ts — read against `c90d8c45af022d838646516b8a17180b9750c00b`, and what is at `62520598944dbc18aef5ef65e133d424d225acaf` is not what was read, so writing it would put back what moved in between — nothing was written — the edits kept do not rebase, and reading those bodies again does not move them. Each line above names one path whose body moved, and every path named there has an edit kept, so a drop naming those paths with an `at:` line each takes their edits away and leaves every other edit kept. Draft those again against the bodies as they now read. `all: true` takes away every edit kept instead, including the ones that rebase.. Nothing has been written.",
  url: "https://alanwalton.com/story-chapter-read/the-wandering-inn-0793-10-47-s-pt-1-96e9e480",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6.1 Mobile/15E148 Safari/604.1 Brave",
  firstSeenAt: "2026-10-11T01:55:56.084Z",
  createdAt: "2026-10-11T01:55:56.419Z",
  updatedAt: "2026-10-11T01:55:56.419Z",
} as const satisfies RuntimeError
