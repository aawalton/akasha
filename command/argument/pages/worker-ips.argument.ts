import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const workerIps = {
  id: "01a094e7-6fab-7d05-87bb-fa13560bd609",
  type: "page-type/argument",
  slug: "worker-ips",
  said: "--worker-ips",
  takes: "every worker's address, where the cluster has workers",
  value: "text",
  placeholder: "csv",
  createdAt: "2026-09-12T09:16:30.507Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
