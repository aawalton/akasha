import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"
import type { NoteSubject } from "akasha/story/world/design-notes/properties/note-subject.text-property.types.ts"

export type StoryDesignNote = Page & {
  title: Title
  world?: World
  subject?: NoteSubject
  prose?: Prose
}
