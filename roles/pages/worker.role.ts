import type { Role } from "../role.page-type.ts"

export const worker = {
  id: "01a053c5-8d2d-7022-928e-ef1f1da1b0c4",
  pageTypeSlug: "role",
  slug: "worker",
  definition: "an agent doing the work its seat is handed",
  onCall: false,
} as const satisfies Role
