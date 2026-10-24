import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const superMinion = {
  id: "01a16d86-b606-7d39-becd-04549beec250",
  type: "page-type/story-read",
  slug: "super-minion",
  author: "Gogglesbear",
  following: false,
  unit: "unit/words",
  title: "Super Minion",
  world: "world/super-minion",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "21410",
      externalLink: "https://www.royalroad.com/fiction/21410/super-minion",
    },
  ],
  externalTags: [
    "Villainous Lead",
    "Super Heroes",
    "Non-Human Lead",
    "Sci-fi",
    "Secret Identity",
    "Action",
    "Artificial Intelligence",
    "Technologically Engineered",
  ],
  readLater: true,
  createdAt: "2026-10-24T10:48:27.398Z",
  updatedAt: "2026-10-24T10:48:27.398Z",
} as const satisfies StoryRead
