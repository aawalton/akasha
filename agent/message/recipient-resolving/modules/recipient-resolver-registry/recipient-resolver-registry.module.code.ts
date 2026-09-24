import type {
  CommsRule,
  OnDemandAgentSpec,
} from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import {
  composeSeatName,
  handlerSeatName,
  identityHeardFrom,
} from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import {
  AGENT_SENDER_PREFIX,
  type PersonHandlerIdentity,
  personHandlerSpec,
  standingPersonaSpec,
} from "akasha/agent/seat/observation/seat-turn/modules/wake-armed-specs/wake-armed-specs.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { ACTION_BAR_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

const ROOT = rootFor(resolveRoots(), AKASHA)

const GAME = "story-game"

const GAME_MASTER = "game-master"

const WORLD_BUILDER = "world-builder"

const PLAYER = "alan"

const GAME_SEAT_TOKEN_THRESHOLD = 150_000

export interface GameSeats {
  readonly game: string
  readonly master: string
  readonly builder: string | null
}

function seatOf(persona: string, role: string, game: string, root: string): string | null {
  return composeSeatName(
    { attributes: { persona, domain: game, role }, flex: null, principal: PLAYER },
    root
  )
}

function builderBeside(master: string, game: string, root: string): string | null {
  const suffix = `-${GAME_MASTER}-${game}`
  if (!master.endsWith(suffix)) return null
  const persona = master.slice(0, -suffix.length)
  if (seatOf(persona, GAME_MASTER, game, root) !== master) return null
  return seatOf(persona, WORLD_BUILDER, game, root)
}

export function gameSeatsIn(root: string): readonly GameSeats[] {
  const found: GameSeats[] = []
  for (const { value } of valuesOfType(root, GAME)) {
    const game = value["slug"]
    const master = value["coordinatorAgent"]
    if (typeof game !== "string" || typeof master !== "string" || master === "") continue
    found.push({ game, master, builder: builderBeside(master, game, root) })
  }
  return found
}

function heardFrom(seat: string, sender: string, id: string): CommsRule {
  return {
    id: `${seat}-${id}`,
    senderMatch: `${AGENT_SENDER_PREFIX}${sender}`,
    contentRegex: undefined,
    target: seat,
    status: "LIVE",
  }
}

function gameSeatSpec(
  seat: string,
  game: string,
  sources: readonly CommsRule[]
): OnDemandAgentSpec {
  return {
    name: seat,
    wakeSources: sources,
    stateAuthority: [{ kind: "pages-rows", detail: `the ${game} game's pages and turns` }],
    resumePolicy: { kind: "resume-under-budget", tokenThreshold: GAME_SEAT_TOKEN_THRESHOLD },
    owner: "awen",
  }
}

export function gameSeatSpecs(seats: readonly GameSeats[]): readonly OnDemandAgentSpec[] {
  return seats.flatMap(({ game, master, builder }) => {
    const bar = heardFrom(master, ACTION_BAR_SENDER, "action-bar")
    if (builder === null) return [gameSeatSpec(master, game, [bar])]
    return [
      gameSeatSpec(master, game, [bar, heardFrom(master, builder, WORLD_BUILDER)]),
      gameSeatSpec(builder, game, [heardFrom(builder, master, GAME_MASTER)]),
    ]
  })
}

const KI_HANDLER_SPEC: OnDemandAgentSpec = personHandlerSpec("amy", "ki", ROOT, {
  owner: "amy",
  stateAuthorityDetail:
    "Ki's owned content pages (books/anime/reviews), RLS-owned by her accountUserId",
})

const JENNY_HANDLER_SPEC: OnDemandAgentSpec = personHandlerSpec("claude", "jenny", ROOT, {
  owner: "atlas",
  stateAuthorityDetail:
    "Jenny's owned Atlas content pages (location/location-collection/collection), RLS-owned by her accountUserId",
})

const SMS_ENTRY_POINT_SPECS: readonly OnDemandAgentSpec[] = [KI_HANDLER_SPEC, JENNY_HANDLER_SPEC]

function declaredSpecs(): readonly OnDemandAgentSpec[] {
  return [...gameSeatSpecs(gameSeatsIn(ROOT)), ...SMS_ENTRY_POINT_SPECS]
}

const SEATED_HANDLER_PERSONS: readonly string[] = ["alan"]

function seatedHandlerSpec(
  person: string,
  personaWakeSources: ReadonlyMap<string, readonly CommsRule[]>
): OnDemandAgentSpec {
  const persona = identityHeardFrom(ROOT, person)
  return standingPersonaSpec(
    handlerSeatName(person, ROOT),
    persona === null ? [] : (personaWakeSources.get(persona) ?? [])
  )
}

function assembleArmedSpecs(
  personaSlugs: readonly string[],
  personaWakeSources: ReadonlyMap<string, readonly CommsRule[]> = new Map(),
  personHandlers: readonly PersonHandlerIdentity[] = []
): readonly OnDemandAgentSpec[] {
  const byName = new Map<string, OnDemandAgentSpec>()
  for (const spec of declaredSpecs()) byName.set(spec.name, spec)
  for (const person of SEATED_HANDLER_PERSONS) {
    const spec = seatedHandlerSpec(person, personaWakeSources)
    if (!byName.has(spec.name)) byName.set(spec.name, spec)
  }
  for (const slug of personaSlugs) {
    if (!byName.has(slug)) {
      byName.set(slug, standingPersonaSpec(slug, personaWakeSources.get(slug) ?? []))
    }
  }
  for (const person of personHandlers) {
    const spec = personHandlerSpec(person.persona, person.slug, ROOT)
    if (!byName.has(spec.name)) byName.set(spec.name, spec)
  }
  return [...byName.values()]
}

export async function assembleRecipientResolverSpecs(
  listPersonaSlugs: () => Promise<readonly string[]>,
  listPersonaWakeSources: () => Promise<ReadonlyMap<string, readonly CommsRule[]>> = async () =>
    new Map(),
  listPersonHandlers: () => Promise<readonly PersonHandlerIdentity[]> = async () => []
): Promise<readonly OnDemandAgentSpec[]> {
  const [personaSlugs, personaWakeSources, personHandlers] = await Promise.all([
    listPersonaSlugs(),
    listPersonaWakeSources(),
    listPersonHandlers(),
  ])
  return assembleArmedSpecs(personaSlugs, personaWakeSources, personHandlers)
}
