import type { Domain } from "../domains/domains/domain.page-type.ts"

export const gameDesign = {
  id: "01a06733-914f-7000-a36f-23cf44ee3a25",
  pageTypeSlug: "domain",
  slug: "game-design",
  definition: "how progression in games and in gamified life is built",
  partSlugs: ["page-type/game-design-drive"],
} as const satisfies Domain
