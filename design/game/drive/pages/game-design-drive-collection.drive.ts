import type { Drive } from "akasha/design/game/drive/drive.page-type.types.ts"

export const gameDesignDriveCollection = {
  id: "01a06756-f6ce-7919-bc70-37a49f9ecba3",
  type: "page-type/drive",
  slug: "game-design-drive-collection",
  definition: "owning a set of things",
  octalysis: {
    number: 4,
    name: "Ownership & Possession",
    definition:
      "Feeling that something is yours, which makes you want more of it and want to improve it.",
  },
  createdAt: "2026-09-03T12:55:47.662Z",
  updatedAt: "2026-09-15T16:44:48.000Z",
} as const satisfies Drive
