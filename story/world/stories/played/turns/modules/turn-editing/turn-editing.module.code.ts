import {
  BEAT_EDITOR,
  CHAPTER,
  GAME_MASTER,
  type Held,
  PROSE_EDITOR,
  type TurnStep,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export function editorAfter(held: Held): TurnStep | null {
  if (held.editorSteps !== true || held.noun !== CHAPTER) return null
  if (held.status === GAME_MASTER && (held.beats ?? 0) === 0) return BEAT_EDITOR
  if (held.status === WRITER) return PROSE_EDITOR
  return null
}
