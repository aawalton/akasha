import type { Alert } from "../alert.page-type.ts"

export const gitMirrorMetricAbsent = {
  id: "01a06755-62f9-7398-aa41-cb26528ba164",
  pageTypeSlug: "alert",
  slug: "git-mirror-metric-absent",
  title: "Git mirror metric absent",
  definition: "nothing is reporting whether the repositories are mirrored",
  domain: "git-repos",
  summary: "git mirror gauge is absent",
  description: "txt",
} as const satisfies Alert
