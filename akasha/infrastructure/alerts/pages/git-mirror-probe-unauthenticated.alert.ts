import type { Alert } from "../alert.page-type.ts"

export const gitMirrorProbeUnauthenticated = {
  id: "01a06755-62f9-72b6-a674-1f6b0f2c2099",
  pageTypeSlug: "alert",
  slug: "git-mirror-probe-unauthenticated",
  title: "Git mirror probe unauthenticated",
  definition: "the mirror probe's credential was refused, so nothing is known about the mirrors",
  domain: "git-repos",
  summary: "git mirror probe could not authenticate for {{ $labels.repo }}",
  description: "txt",
} as const satisfies Alert
