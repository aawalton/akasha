import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theWanderingInn = {
  id: "01a0657d-ada7-783d-a3df-0d4d06ca98ab",
  type: "page-type/story-read",
  slug: "the-wandering-inn",
  title: "The Wandering Inn",
  world: "world/the-wandering-inn",
  externalIdentity: [
    {
      source: "the-wandering-inn",
      externalLink: "https://wanderinginn.com/",
    },
  ],
  rank: "S",
  tags: ["litrpg", "fantasy", "slice-of-life"],
  unit: "unit/words",
  prose: "txt",
  parts: [
    "module/chapter",
    "module/chapter-filing",
    "module/site",
    "module/sync-run-recording",
    "module/syncing",
    "service-workstation/wandering-inn-sync",
  ],
} as const satisfies StoryRead
