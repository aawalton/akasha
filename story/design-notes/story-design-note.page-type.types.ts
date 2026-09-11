import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { NoteSubject } from "akasha/story/design-notes/properties/note-subject.text-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"

export type StoryDesignNote = Page & {
  title: Title
  world?: World
  subject?: NoteSubject
  prose?: Prose
}
