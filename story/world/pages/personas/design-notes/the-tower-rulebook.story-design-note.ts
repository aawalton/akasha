import type { StoryDesignNote } from "akasha/story/world/design-notes/story-design-note.page-type.types.ts"

export const theTowerRulebook = {
  id: "01a0657d-bb98-79fe-bfdc-5aefedca7610",
  type: "page-type/story-design-note",
  slug: "the-tower-rulebook",
  title: "rulebook",
  world: "world/personas",
  subject: "the-tower",
  prose: "txt",
} as const satisfies StoryDesignNote
