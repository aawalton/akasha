import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const controlPlaneIps = {
  id: "01a094e7-0d25-7f56-9a58-3b5b81af2c20",
  type: "page-type/argument",
  slug: "control-plane-ips",
  said: "--control-plane-ips",
  takes: "every etcd member's address, which the membership arm weighs",
  value: "text",
  placeholder: "csv",
  createdAt: "2026-09-12T09:16:05.285Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
