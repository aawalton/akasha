import {
  answerFor,
  defaultEffects,
  type Gating,
  gateFor,
} from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import {
  WANTED,
  type Wanted,
} from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import {
  type HeldSet,
  heldAbilitySet,
} from "akasha/story/world/stories/played/modules/held-ability-setting/held-ability-setting.module.code.ts"

const NO_ASK = "Name a held ability, and whether it is set aside or taken up."

const NOT_LISTENING = "The game is not listening right now. Try again."

export type HeldAbilityEffects = Gating & {
  readonly set: (game: string, held: string, wanted: Wanted) => Promise<HeldSet>
}

export function heldAbilityEffects(): HeldAbilityEffects {
  const gating = defaultEffects()
  return {
    signedIn: gating.signedIn,
    enrol: gating.enrol,
    seatOf: gating.seatOf,
    set: (game, held, wanted) => heldAbilitySet(game, held, wanted),
  }
}

type Ask = { readonly game: string; readonly held: string; readonly wanted: Wanted }

export function askIn(body: unknown): Ask | null {
  if (typeof body !== "object" || body === null) return null
  const said = body as {
    readonly gameExternalId?: unknown
    readonly held?: unknown
    readonly wanted?: unknown
  }
  const game = textIn(said.gameExternalId)
  const held = textIn(said.held)
  const wanted = WANTED.find((one) => one === said.wanted)
  if (game === null || held === null || held.trim() === "" || wanted === undefined) return null
  return { game, held, wanted }
}

async function setBy(effects: HeldAbilityEffects, game: string, ask: Ask): Promise<HeldSet> {
  try {
    return await effects.set(game, ask.held, ask.wanted)
  } catch (thrown) {
    return { kind: "unread", why: saidBy(thrown) }
  }
}

export async function answerHeldAbility(
  request: Request,
  effects: HeldAbilityEffects = heldAbilityEffects()
): Promise<Response> {
  const answer = answerFor(request)
  const body: unknown = await request.json().catch(() => null)
  const ask = askIn(body)
  if (ask === null) return answer({ ok: false, error: NO_ASK }, 400)
  const gate = await gateFor(effects, request, ask.game, answer)
  if (!gate.ok) return gate.answered
  const set = await setBy(effects, gate.game, ask)
  if (set.kind === "refused") return answer({ ok: false, error: set.said }, 409)
  if (set.kind === "unread") {
    console.error(`${ask.held} of ${gate.game} was not changed: ${set.why}`)
    return answer({ ok: false, error: NOT_LISTENING }, 503)
  }
  return answer({ ok: true, event: set.event, turn: set.turn }, 200)
}
