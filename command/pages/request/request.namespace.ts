import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const request = {
  id: "01a0c501-03d8-7e2f-9cfe-0943bb8d8511",
  type: "page-type/namespace",
  slug: "request",
  definition: "the feature requests contributors ask for and what Alan does with each",
  parts: ["command/request-publish", "command/request-complete", "module/request-reaching"],
  name: "request",
} as const satisfies Namespace
