import type { Drive } from "../drive.page-type.types.ts"

export const gameDesignDriveConnection = {
  id: "01a06756-f6f5-7218-8940-a13040529419",
  pageTypeSlug: "drive",
  type: "drive",
  slug: "game-design-drive-connection",
  definition: "being close to other people",
  octalysis: {
    number: 5,
    name: "Social Influence & Relatedness",
    definition:
      "Being moved by other people, whether by company and mentorship or by competition and envy.",
  },
} as const satisfies Drive
