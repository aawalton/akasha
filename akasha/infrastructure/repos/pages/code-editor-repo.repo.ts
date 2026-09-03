import type { Repo } from "../repo.page-type.ts"

export const codeEditorRepo = {
  id: "01a06975-df76-72ba-a73c-41f5338c7faa",
  pageTypeSlug: "repo",
  slug: "code-editor-repo",
  definition: "the repository the editor is built from",
} as const satisfies Repo
