import type { Alert } from "../alert.page-type.ts"

export const gitMirrorRefsBehind = {
  id: "01a06755-62f9-7f02-9ed3-856e536f328e",
  pageTypeSlug: "alert",
  slug: "git-mirror-refs-behind",
  title: "Git mirror refs behind",
  definition: "a repository's mirror is missing refs the bare repository holds",
  domain: "git-repos",
  summary: "git mirror for {{ $labels.repo }} is {{ $value }} ref(s) behind its bare repo",
  description: "txt",
} as const satisfies Alert
