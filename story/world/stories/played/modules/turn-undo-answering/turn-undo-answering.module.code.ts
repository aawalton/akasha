import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyTurnCancel } from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.code.ts"
import { storyTurnTakeBack } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  changeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askAnswered,
  storiesIn,
} from "akasha/story/world/stories/played/modules/cover-rerolling/cover-rerolling.module.code.ts"
import {
  PLAYER,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const TURN = "story-turn-played"

const TURN_OPENS = `${TURN}/`

const ASKED = "turnUndo"

const REFUSED = "turnUndoRefused"

const STATUS = "stepStatus"

const TURN_FLAG = "--turn"

const TAKE_BACK_MECHANICS = "--take-back-mechanics"

const CANCEL_CALLED = "akasha story turn cancel"

const TAKE_BACK_CALLED = "akasha story turn take-back"

const POLL_MS = 2000

const GONE = "That turn is no longer here to undo."

const NOT_UNDONE = "The turn was not undone."

export function undoAskedIn(beside: Value | null): string | null {
  const asked = beside === null ? null : textAt(beside, ASKED)
  return asked?.startsWith(TURN_OPENS) === true ? asked : null
}

export function undoArgv(turn: string, atPlayer: boolean): readonly string[] {
  return atPlayer ? [TURN_FLAG, turn] : [TURN_FLAG, turn, TAKE_BACK_MECHANICS]
}

export function undoAnswered(beside: Value | null, refused: string | null): Value {
  return askAnswered(beside, ASKED, REFUSED, refused)
}

export type UndoAnswering = {
  readonly beside: (story: string) => Value | null
  readonly turn: (address: string) => Value | null
  readonly cancel: (argv: readonly string[]) => Promise<Answer>
  readonly takeBack: (argv: readonly string[]) => Promise<Answer>
  readonly answer: (story: string, refused: string | null) => undefined
}

async function undone(asked: string, effects: UndoAnswering): Promise<string | null> {
  const before = effects.turn(asked)
  if (before === null) return GONE
  const atPlayer = stepIn(before[STATUS]) === PLAYER
  const argv = undoArgv(asked, atPlayer)
  const answer = atPlayer ? await effects.takeBack(argv) : await effects.cancel(argv)
  if (effects.turn(asked) === null) return null
  const said = answer.refusals.join(" ").trim()
  return said === "" ? NOT_UNDONE : said
}

export async function undoOf(story: string, effects: UndoAnswering): Promise<boolean> {
  const asked = undoAskedIn(effects.beside(story))
  if (asked === null) return false
  effects.answer(story, await undone(asked, effects))
  return true
}

function answeringAt(root: string): UndoAnswering {
  const given = (calledAs: string): Given => ({
    root,
    calledAs,
    from: root,
    writer: null,
    agentId: null,
  })
  return {
    beside: (story) => uncommittedIn(root, story),
    turn: (address) => {
      const listed = listedAt(root, TURN, address.slice(TURN_OPENS.length))
      const path = listed.length === 1 ? listed[0]?.path : undefined
      return path === undefined ? null : valueAt(path, root)
    },
    cancel: async (argv) => await storyTurnCancel(argv, given(CANCEL_CALLED)),
    takeBack: async (argv) => await storyTurnTakeBack(argv, given(TAKE_BACK_CALLED)),
    answer: (story, refused) => {
      changeUncommitted(root, story, (held) => undoAnswered(held, refused))
      return undefined
    },
  }
}

export function watchTurnUndos(): () => undefined {
  const root = akashaRoot()
  const effects = answeringAt(root)
  let busy = false
  const round = async (): Promise<undefined> => {
    if (busy) return undefined
    busy = true
    try {
      for (const story of storiesIn(root)) {
        try {
          await undoOf(story, effects)
        } catch (thrown) {
          process.stderr.write(`${story}: ${saidBy(thrown)}\n`)
          effects.answer(story, saidBy(thrown))
        }
      }
    } finally {
      busy = false
    }
    return undefined
  }
  const timer = setInterval(() => void round(), POLL_MS)
  void round()
  return () => {
    clearInterval(timer)
    return undefined
  }
}
