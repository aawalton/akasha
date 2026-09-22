import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeTarget = {
  id: "01a0814e-c10e-7ebb-9a24-ec1c319fb801",
  type: "page-type/domain",
  slug: "change-target",
  definition: "the thing under a change",
  parts: ["page-type/change-target-subtype", "page-type/change-target-type"],
} as const satisfies Domain
