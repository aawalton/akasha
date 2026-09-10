import type { Alert } from "../../alert.page-type.types.ts"

export const gitMirrorDestinationUnreachable = {
  id: "01a06755-62f9-7bf4-9544-04ea427cae2a",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "git-mirror-destination-unreachable",
  title: "Git mirror destination unreachable",
  definition: "a repository's mirror destination did not answer",
  domain: "git-repos",
  summary: "git mirror destination for {{ $labels.repo }} could not be read",
  runbook: "txt",
} as const satisfies Alert
