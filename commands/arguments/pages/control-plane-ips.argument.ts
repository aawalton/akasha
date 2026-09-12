import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const controlPlaneIps = {
  id: "01a094e7-0d25-7f56-9a58-3b5b81af2c20",
  type: "argument",
  slug: "control-plane-ips",
  said: "--control-plane-ips",
  takes: "every etcd member's address, which the membership arm weighs",
  value: "text",
  placeholder: "csv",
} as const satisfies Argument
