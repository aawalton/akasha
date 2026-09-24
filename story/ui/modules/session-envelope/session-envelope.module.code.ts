import { classifyActionBarMessage } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import type { GameDisplayModules } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import {
  proseWindowSegmentsIn,
  type WrittenWindow,
  windowOf,
} from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import type {
  PendingActionInput,
  SessionEnvelope,
} from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import {
  projectClientBeats,
  projectClientHud,
  projectClientQuests,
  projectClientSheet,
  projectStateChapterLinks,
} from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import type {
  ClientProseSegment,
  ClientStoryChapter,
  ClientStoryTurn,
} from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { selectPendingActions } from "akasha/story/ui/modules/pending-actions/pending-actions.module.code.ts"

export interface StoryLedger {
  readonly chapters: readonly ClientStoryChapter[]
  readonly current: readonly ClientStoryTurn[]
  readonly publishedState?: GameState | null
}

export interface EnvelopeInputs {
  readonly state: GameState | null
  readonly story: StoryLedger | null
  readonly actions?: readonly PendingActionInput[]
  readonly latestTurnAt?: number | null
  readonly latestStateAt?: number | null
}

const SECTION_MODULE_KEYS = [
  "chapterProse",
  "beatLog",
  "hud",
  "quests",
  "sheet",
  "storySoFar",
  "actionBox",
] as const

export function assertEnvelopeMatchesModules(
  modules: GameDisplayModules,
  envelope: SessionEnvelope
): undefined {
  for (const key of SECTION_MODULE_KEYS) {
    const declared = modules[key] !== undefined
    const present = envelope[key] !== undefined
    if (declared !== present) {
      throw new Error(
        `awen session envelope drift: module "${key}" is ${
          declared ? "declared but its section is missing" : "undeclared but its section is present"
        }`
      )
    }
  }
}

function windowSegment(written: WrittenWindow): ClientProseSegment {
  const window = windowOf(written)
  if (window !== undefined) return { kind: "system", window }
  return {
    kind: "system",
    title: written.name ?? written.kind,
    ...(written.note === undefined ? {} : { lines: [written.note] }),
  }
}

function withWindows(turn: ClientStoryTurn): ClientStoryTurn {
  const cut = proseWindowSegmentsIn(turn.text)
  if (cut.every((one) => one.kind === "prose")) return turn
  const segments = cut.map(
    (one): ClientProseSegment => (one.kind === "prose" ? one : windowSegment(one.window))
  )
  return { ...turn, segments }
}

export function composeSessionEnvelope(
  title: string,
  modules: GameDisplayModules,
  inputs: EnvelopeInputs
): SessionEnvelope {
  const envelope: SessionEnvelope = { title }
  const stateForSections = inputs.story?.publishedState ?? inputs.state
  if (modules.chapterProse !== undefined) {
    envelope.chapterProse = (inputs.story?.current ?? []).map(withWindows)
  }
  if (modules.beatLog !== undefined) {
    envelope.beatLog = stateForSections === null ? null : [...projectClientBeats(stateForSections)]
  }
  if (modules.hud !== undefined) {
    envelope.hud = stateForSections === null ? null : projectClientHud(stateForSections)
  }
  if (modules.quests !== undefined) {
    envelope.quests = stateForSections === null ? null : [...projectClientQuests(stateForSections)]
  }
  if (modules.sheet !== undefined) {
    envelope.sheet =
      stateForSections === null
        ? null
        : projectClientSheet(stateForSections, modules.sheet.revealKeys)
  }
  if (modules.storySoFar !== undefined) {
    envelope.storySoFar =
      modules.storySoFar.source === "turns"
        ? [...(inputs.story?.chapters ?? [])]
        : stateForSections === null
          ? []
          : [...projectStateChapterLinks(stateForSections)]
  }
  if (modules.actionBox !== undefined) {
    envelope.actionBox = selectPendingActions(
      inputs.actions ?? [],
      inputs.latestTurnAt ?? null,
      inputs.latestStateAt ?? null
    ).map((action) => ({
      text: action.text,
      submittedAt: action.submittedAt,
      kind: classifyActionBarMessage(action.text),
    }))
  }
  assertEnvelopeMatchesModules(modules, envelope)
  return envelope
}
