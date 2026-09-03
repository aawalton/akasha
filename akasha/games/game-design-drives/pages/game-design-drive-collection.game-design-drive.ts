import type { GameDesignDrive } from "../game-design-drive.page-type.ts"

export const gameDesignDriveCollection = {
  id: "01a06756-f6ce-7919-bc70-37a49f9ecba3",
  pageTypeSlug: "game-design-drive",
  slug: "game-design-drive-collection",
  definition: "owning a set of things",
  octalysis: {
    number: 4,
    name: "Ownership & Possession",
    definition:
      "Feeling that something is yours, which makes you want more of it and want to improve it.",
  },
} as const satisfies GameDesignDrive
