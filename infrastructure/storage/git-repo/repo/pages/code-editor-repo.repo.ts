import type { Repo } from "akasha/infrastructure/storage/git-repo/repo/repo.page-type.types.ts"

export const codeEditorRepo = {
  id: "01a06975-df76-72ba-a73c-41f5338c7faa",
  type: "page-type/repo",
  slug: "code-editor-repo",
  definition: "the repo that holds the code of the code editor",
  createdAt: "2026-09-03T22:48:47.734Z",
  updatedAt: "2026-10-30T16:11:16.105Z",
} as const satisfies Repo
