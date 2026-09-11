import type { Drive } from "akasha/design/games/drives/drive.page-type.types.ts"

export const gameDesignDriveCreativity = {
  id: "01a06756-f6b4-724b-ac1f-7d3bfb1af1a3",
  pageTypeSlug: "drive",
  type: "drive",
  slug: "game-design-drive-creativity",
  definition: "making something new",
  octalysis: {
    number: 3,
    name: "Empowerment of Creativity & Feedback",
    definition:
      "Working things out for yourself, trying combinations, and seeing what your choices did.",
  },
} as const satisfies Drive
