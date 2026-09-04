import type { GameDesignDrive } from "../game-design-drive.page-type.ts"

export const gameDesignDriveConnection = {
  id: "01a06756-f6f5-7218-8940-a13040529419",
  pageTypeSlug: "game-design-drive",
  slug: "game-design-drive-connection",
  definition: "being close to other people",
  octalysis: {
    number: 5,
    name: "Social Influence & Relatedness",
    definition:
      "Being moved by other people, whether by company and mentorship or by competition and envy.",
  },
} as const satisfies GameDesignDrive
