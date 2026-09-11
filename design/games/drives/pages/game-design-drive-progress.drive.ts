import type { Drive } from "akasha/design/games/drives/drive.page-type.types.ts"

export const gameDesignDriveProgress = {
  id: "01a06756-f697-794a-9d4f-21814410d87e",
  pageTypeSlug: "drive",
  type: "drive",
  slug: "game-design-drive-progress",
  definition: "getting better at something",
  octalysis: {
    number: 2,
    name: "Development & Accomplishment",
    definition: "Making progress, gaining skill, and overcoming challenges worth the effort.",
  },
} as const satisfies Drive
