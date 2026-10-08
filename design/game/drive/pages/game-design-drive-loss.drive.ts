import type { Drive } from "akasha/design/game/drive/drive.page-type.types.ts"

export const gameDesignDriveLoss = {
  id: "01a06756-f756-773c-8f35-a24988307063",
  type: "page-type/drive",
  slug: "game-design-drive-loss",
  definition: "losing what was already gained",
  octalysis: {
    number: 8,
    name: "Loss & Avoidance",
    definition:
      "Acting to stop something bad, such as progress slipping away or a chance never coming back.",
  },
  createdAt: "2026-09-03T12:55:47.798Z",
  updatedAt: "2026-09-15T16:44:48.000Z",
} as const satisfies Drive
