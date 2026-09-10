import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { NoteSubject } from "./properties/note-subject.text-property.ts"

export type StoryDesignNote = Page & {
  title: Title
  world?: World
  subject?: NoteSubject
  prose?: Prose
}
