import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pty = {
  id: "01a0932f-f8ee-7c96-8069-edc7cda2dc6d",
  type: "domain",
  slug: "pty",
  definition: "a pseudo-terminal a process runs under",
  parts: ["module/bun-pty"],
} as const satisfies Domain
