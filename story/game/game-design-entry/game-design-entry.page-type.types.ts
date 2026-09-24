import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { DesignKind } from "akasha/story/game/game-design-entry/properties/design-kind.text-property.types.ts"
import type { DesignNote } from "akasha/story/game/game-design-entry/properties/design-note.file-property.types.ts"
import type { EntrySource } from "akasha/story/game/game-design-entry/properties/entry-source.text-property.types.ts"
import type { SupersededEntry } from "akasha/story/game/game-design-entry/properties/superseded-entry.relation-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"

export type GameDesignEntry = Page & {
  title: Title
  game: HoldingGame
  kind: DesignKind
  source?: EntrySource
  supersedes?: SupersededEntry
  note: DesignNote
}
