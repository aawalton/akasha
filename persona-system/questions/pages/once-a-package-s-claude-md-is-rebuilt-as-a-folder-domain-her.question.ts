import type { Question } from "../question.page-type.ts"

export const onceAPackageSClaudeMdIsRebuiltAsAFolderDomainHer = {
  id: "019fba83-f773-73c7-b205-693aaa752978",
  pageTypeSlug: "question",
  slug: "once-a-package-s-claude-md-is-rebuilt-as-a-folder-domain-her",
  ask: "Once a package's CLAUDE.md is rebuilt as a folder domain here, what happens to the CLAUDE.md still sitting in the code tree?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Leave the CLAUDE.md untouched; the loader front deals with it later",
    "Empty it to a stub pointing at the folder domain",
    "Delete it as each folder domain lands",
  ],
  answer: "Delete it as each folder domain lands",
  closedAt: "2026-07-31T23:31:24.831Z",
  context: "txt",
} as const satisfies Question
