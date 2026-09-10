import type { Alert } from "../../alert.page-type.types.ts"

export const gitMirrorNoDestination = {
  id: "01a06755-62f9-79f9-bca3-4f9e0f92dfb8",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "git-mirror-no-destination",
  title: "Git mirror no destination",
  definition: "a repository is served with no mirror destination declared for it",
  domain: "git-repos",
  summary: "git repo {{ $labels.repo }} declares no mirror destination",
  runbook: "txt",
} as const satisfies Alert
