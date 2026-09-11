import type { Drive } from "akasha/design/games/drives/drive.page-type.types.ts"

export const gameDesignDriveScarcity = {
  id: "01a06756-f717-781b-a67c-001849934e02",
  type: "drive",
  slug: "game-design-drive-scarcity",
  definition: "wanting what is out of reach",
  octalysis: {
    number: 6,
    name: "Scarcity & Impatience",
    definition: "Wanting something more because you cannot have it, or cannot have it right now.",
  },
} as const satisfies Drive
