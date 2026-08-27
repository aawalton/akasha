import { loadActionInputs } from "./awen-actions.server"
import { loadLatestState } from "./awen-state.server"
import { loadStoryLedger } from "./awen-story.server"
import type { SessionEnvelope } from "./client-envelope"
import type { AwenGameConfig } from "./game.server"
import { composeSessionEnvelope } from "./session-envelope"

const NO_ACTIONS = { actions: [], latestTurnAt: null, latestStateAt: null } as const

export async function loadSessionEnvelope(game: AwenGameConfig): Promise<SessionEnvelope> {
  const modules = game.display.modules
  const needsState =
    modules.beatLog !== undefined ||
    modules.hud !== undefined ||
    modules.quests !== undefined ||
    modules.sheet !== undefined ||
    modules.storySoFar?.source === "stateLedger" ||
    modules.chapterProse?.systemWindows === true
  const needsTurns = modules.chapterProse !== undefined || modules.storySoFar?.source === "turns"
  const needsActions = modules.actionBox !== undefined

  const [state, story, actionInputs] = await Promise.all([
    needsState ? loadLatestState(game) : Promise.resolve(null),
    needsTurns ? loadStoryLedger(game) : Promise.resolve(null),
    needsActions ? loadActionInputs(game) : Promise.resolve(NO_ACTIONS),
  ])

  return composeSessionEnvelope(
    game.title,
    modules,
    {
      state,
      story,
      actions: actionInputs.actions,
      latestTurnAt: actionInputs.latestTurnAt,
      latestStateAt: actionInputs.latestStateAt,
    },
    (mismatch) => {
      console.warn(
        `[awen] inline system-window mismatch in "${game.title}" turn ${
          mismatch.turnNumber ?? "?"
        } (${mismatch.turnId}): ${mismatch.reason === "malformed" ? "malformed marker at rest" : `${mismatch.markerCount} marker(s) vs ${mismatch.beatCount} system beat(s)`}`
      )
    }
  )
}
