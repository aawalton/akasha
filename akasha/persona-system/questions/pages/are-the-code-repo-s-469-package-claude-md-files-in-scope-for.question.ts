import type { Question } from "../question.page-type.ts"

export const areTheCodeRepoS469PackageClaudeMdFilesInScopeFor = {
  id: "019fba71-0a40-7ea3-9339-51b7f56d83a3",
  pageTypeSlug: "question",
  slug: "are-the-code-repo-s-469-package-claude-md-files-in-scope-for",
  ask: "Are the code repo's 469 package CLAUDE.md files in scope for tonight, and if so, does ingesting one mean moving it out of the code repo?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "In scope tonight: quarantine into dirty/, rebuild the ones with readers",
    "In scope tonight: read them in place in the code repo and stamp them there",
    "Out of scope tonight — dirty/ only; leave the code half for a later ruling",
  ],
  answer:
    "in scope tonight, rebuild all of the ones that we have a clear path to rebuild, don't filter by whether they have readers. They should be folder domains",
  closedAt: "2026-07-31T23:10:39.412Z",
  context: "txt",
} as const satisfies Question
