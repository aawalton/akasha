import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const workerIps = {
  id: "01a094e7-6fab-7d05-87bb-fa13560bd609",
  type: "argument",
  slug: "worker-ips",
  said: "--worker-ips",
  takes: "every worker's address, where the cluster has workers",
  value: "text",
  placeholder: "csv",
} as const satisfies Argument
