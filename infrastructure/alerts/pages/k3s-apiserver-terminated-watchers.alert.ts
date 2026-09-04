import type { Alert } from "../alert.page-type.ts"

export const k3sApiserverTerminatedWatchers = {
  id: "01a06755-62fa-71d1-8a3b-76e01294ba19",
  pageTypeSlug: "alert",
  slug: "k3s-apiserver-terminated-watchers",
  title: "K3s apiserver terminated watchers",
  definition: "the k3s apiserver is cutting off clients watching for changes",
  domain: "infrastructure",
  summary: "k3s apiserver terminated >10 pods watchers in 5 min",
  description: "txt",
} as const satisfies Alert
