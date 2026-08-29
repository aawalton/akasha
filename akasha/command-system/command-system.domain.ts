import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const commandSystem = {
  id: "01a04a32-495b-7c15-b0a8-eb92223590c4",
  pageTypeSlug: "domain",
  slug: "command-system",
  definition: "what an agent runs by name",
  partSlugs: ["page-type/command", "module/calling", "command/read", "command/write", "command/edit"],
  requiredReadingSlugs: ["page-type/command"],
} as const satisfies Domain
