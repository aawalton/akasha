import type { Alert } from "../alert.page-type.ts"

export const k3sApiserverWatchCacheReinitializing = {
  id: "01a06755-62fa-7cad-916c-cccd22a19c37",
  pageTypeSlug: "alert",
  slug: "k3s-apiserver-watch-cache-reinitializing",
  title: "K3s apiserver watch cache reinitializing",
  definition: "the k3s apiserver is rebuilding the cache it serves watches from",
  domain: "infrastructure",
  summary: "k3s apiserver pods watch cache reinitialized >1× in 15 min",
  description: "txt",
} as const satisfies Alert
