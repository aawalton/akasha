import type {
  CommsRule,
  FirstStart,
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
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import {
  ACTION_BAR_PLAYER,
  ACTION_BAR_SENDER,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { STEP_SENDER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROOT = rootFor(resolveRoots(), AKASHA)

const STORY = "story"

const STORY_PLAYED = "story-played"

const GAME_MASTER = "game-master"

const WORLD_BUILDER = "world-builder"

const WRITER = "writer"

const EDITORS: readonly string[] = ["beat-editor", "prose-editor"]

const EDITOR_STEPS = "editorSteps"

const GAME_SEAT_TOKEN_THRESHOLD = 150_000

interface Editor {
  readonly seat: string
  readonly role: string
}

interface GameSeats {
  readonly game: string
  readonly master: string
  readonly persona: string | null
  readonly builder: string | null
  readonly writer: string | null
  readonly played?: boolean
  readonly editors?: readonly Editor[]
}

function seatOf(persona: string, role: string, game: string, root: string): string | null {
  return composeSeatName(
    { attributes: { persona, domain: game, role }, flex: null, principal: ACTION_BAR_PLAYER },
    root
  )
}

function personaOf(master: string, game: string, root: string): string | null {
  const suffix = `-${GAME_MASTER}-${game}`
  if (!master.endsWith(suffix)) return null
  const persona = master.slice(0, -suffix.length)
  return seatOf(persona, GAME_MASTER, game, root) === master ? persona : null
}

function editorsOf(persona: string | null, game: string, edited: boolean, root: string) {
  if (persona === null || !edited) return []
  return EDITORS.flatMap((role): Editor[] => {
    const seat = seatOf(persona, role, game, root)
    return seat === null ? [] : [{ seat, role }]
  })
}

export function gameSeatsIn(root: string): readonly GameSeats[] {
  const found: GameSeats[] = []
  const reading = readingIn(root)
  const kinds = [...kindsUnder(STORY, reading)].sort()
  const playedKinds = kindsUnder(STORY_PLAYED, reading)
  for (const kind of kinds) {
    for (const { value } of valuesOfType(root, kind)) {
      const game = value["slug"]
      const master = value["coordinatorAgent"]
      if (typeof game !== "string" || typeof master !== "string" || master === "") continue
      const persona = personaOf(master, game, root)
      const builder = persona === null ? null : seatOf(persona, WORLD_BUILDER, game, root)
      const writer = persona === null ? null : seatOf(persona, WRITER, game, root)
      const editors = editorsOf(persona, game, value[EDITOR_STEPS] === true, root)
      const played = playedKinds.has(kind)
      found.push({ game, master, persona, builder, writer, played, editors })
    }
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
  sources: readonly CommsRule[],
  firstStart: FirstStart | null
): OnDemandAgentSpec {
  const spec: OnDemandAgentSpec = {
    name: seat,
    wakeSources: sources,
    stateAuthority: [{ kind: "pages-rows", detail: `the ${game} game's pages and turns` }],
    resumePolicy: { kind: "resume-under-budget", tokenThreshold: GAME_SEAT_TOKEN_THRESHOLD },
    owner: "awen",
  }
  return firstStart === null ? spec : { ...spec, firstStart }
}

export function gameSeatSpecs(seats: readonly GameSeats[]): readonly OnDemandAgentSpec[] {
  return seats.flatMap(({ game, master, persona, builder, writer, played, editors = [] }) => {
    const startAs = (role: string): FirstStart | null =>
      persona === null ? null : { persona, role, domain: game, principal: ACTION_BAR_PLAYER }
    const bar = played === false ? [] : [heardFrom(master, ACTION_BAR_SENDER, "action-bar")]
    const noticed = heardFrom(master, STEP_SENDER, STEP_SENDER)
    const specs = [
      gameSeatSpec(
        master,
        game,
        builder === null
          ? [...bar, noticed]
          : [...bar, noticed, heardFrom(master, builder, WORLD_BUILDER)],
        startAs(GAME_MASTER)
      ),
    ]
    if (builder !== null) {
      specs.push(
        gameSeatSpec(
          builder,
          game,
          [heardFrom(builder, master, GAME_MASTER), heardFrom(builder, STEP_SENDER, STEP_SENDER)],
          startAs(WORLD_BUILDER)
        )
      )
    }
    if (writer !== null) {
      specs.push(
        gameSeatSpec(writer, game, [heardFrom(writer, STEP_SENDER, STEP_SENDER)], startAs(WRITER))
      )
    }
    for (const { seat, role } of editors) {
      specs.push(
        gameSeatSpec(seat, game, [heardFrom(seat, STEP_SENDER, STEP_SENDER)], startAs(role))
      )
    }
    return specs
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
