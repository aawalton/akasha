import type { Role } from "../role.page-type.ts"

export const scenewright = {
  id: "01a053c5-8d2d-70a4-8ed2-c8c6f6cc611c",
  pageTypeSlug: "role",
  slug: "scenewright",
  definition: "an agent writing one persona's scene whole and landing it",
  onCall: false,
} as const satisfies Role
