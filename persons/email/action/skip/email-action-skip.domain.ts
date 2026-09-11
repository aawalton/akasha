import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const emailActionSkip = {
  id: "01a0675b-16e5-72ee-95ac-98cc467b6b00",
  type: "domain",
  slug: "email-action-skip",
  definition: "doing nothing to a piece of mail",
} as const satisfies Domain
