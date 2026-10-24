import type {
  CommsRule,
  FirstStart,
  OnDemandAgentSpec,
} from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { roleplay as roleplayRole } from "akasha/agent/role/pages/roleplay.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import {
  composeSeatName,
  handlerSeatName,
  identityHeardFrom,
} from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import {
  AGENT_SENDER_PREFIX,
  type PersonHandlerIdentity,
  type PersonHandlerSpecOptions,
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
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  JOB_SENDER,
  STEP_SENDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  coordinatorOf,
  flexOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const ROOT = rootFor(resolveRoots(), AKASHA)

const STORY = "story"

const STORY_PLAYED = "story-played"

const GAME_MASTER = "game-master"

const WORLD_BUILDER = "world-builder"

const WRITER = "writer"

const ROLEPLAY = roleplayRole.slug

const GAME_SEAT_TOKEN_THRESHOLD = 150_000

interface GameSeats {
  readonly game: string
  readonly master: string
  readonly persona: string | null
  readonly role?: string
  readonly builder: string | null
  readonly writer: string | null
  readonly played?: boolean
  readonly staff?: readonly string[]
}

type Staff = { readonly reviewers: readonly string[]; readonly recorders: readonly string[] }

function seatOf(
  persona: string,
  role: string,
  game: string,
  root: string,
  flex: string | null = null
): string | null {
  return composeSeatName(
    { attributes: { persona, domain: game, role }, flex, principal: ACTION_BAR_PLAYER },
    root
  )
}

function slugsOf(root: string, type: string): readonly string[] {
  return valuesOfType(root, type).flatMap(({ value }) => {
    const slug = value["slug"]
    return typeof slug === "string" ? [slug] : []
  })
}

function staffOf(persona: string, game: string, root: string, staff: Staff): readonly string[] {
  const seats = (role: string, slugs: readonly string[]) =>
    slugs.flatMap((slug) => seatOf(persona, role, game, root, flexOf(slugs, slug)) ?? [])
  return [
    ...seats(reviewerRole.slug, staff.reviewers),
    ...seats(storyRecorderRole.slug, staff.recorders),
  ]
}

function coordinatorIn(master: string, game: string, root: string) {
  const held = coordinatorOf(master, game)
  if (held === null) return null
  return seatOf(held.persona, held.role, game, root) === master ? held : null
}

export function gameSeatsIn(root: string): readonly GameSeats[] {
  const found: GameSeats[] = []
  const reading = readingIn(root)
  const kinds = [...kindsUnder(STORY, reading)].sort()
  const playedKinds = kindsUnder(STORY_PLAYED, reading)
  const staffed = {
    reviewers: slugsOf(root, storyReviewer.slug),
    recorders: slugsOf(root, storyRecorder.slug),
  }
  for (const kind of kinds) {
    for (const { value } of valuesOfType(root, kind)) {
      const game = value["slug"]
      const master = value["coordinatorAgent"]
      if (typeof game !== "string" || typeof master !== "string" || master === "") continue
      const held = coordinatorIn(master, game, root)
      const persona = held?.persona ?? null
      const crew = held?.role === GAME_MASTER ? persona : null
      const builder = crew === null ? null : seatOf(crew, WORLD_BUILDER, game, root)
      const writer = crew === null ? null : seatOf(crew, WRITER, game, root)
      const played = playedKinds.has(kind)
      const staff = crew === null ? [] : staffOf(crew, game, root, staffed)
      const role = held === null ? {} : { role: held.role }
      found.push({ game, master, persona, ...role, builder, writer, played, staff })
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

function narrating(start: FirstStart | null, seat: string, story: string): FirstStart | null {
  if (start === null) return null
  const prompt = `You are \`${seat}\`, and you narrate the played story \`${story}\`. Alan plays it on the play screen alone, so each notice of its turns and each bracketed line he sends reaches you as a message.`
  return { ...start, startMode: SEAT_MODE_HEADLESS, prompt }
}

export function gameSeatSpecs(seats: readonly GameSeats[]): readonly OnDemandAgentSpec[] {
  return seats.flatMap(({ game, master, persona, role, builder, writer, played, staff }) => {
    const startAs = (as: string): FirstStart | null =>
      persona === null ? null : { persona, role: as, domain: game, principal: ACTION_BAR_PLAYER }
    const coordinating =
      role === ROLEPLAY ? narrating(startAs(ROLEPLAY), master, game) : startAs(GAME_MASTER)
    const bar = played === false ? [] : [heardFrom(master, ACTION_BAR_SENDER, "action-bar")]
    const noticed = heardFrom(master, STEP_SENDER, STEP_SENDER)
    const specs = [
      gameSeatSpec(
        master,
        game,
        builder === null
          ? [...bar, noticed]
          : [...bar, noticed, heardFrom(master, builder, WORLD_BUILDER)],
        coordinating
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
    for (const seat of staff ?? []) {
      const sources = [
        heardFrom(seat, JOB_SENDER, JOB_SENDER),
        heardFrom(seat, master, GAME_MASTER),
      ]
      specs.push(gameSeatSpec(seat, game, sources, null))
    }
    return specs
  })
}

const PERSON_HANDLER_OPTIONS: ReadonlyMap<string, PersonHandlerSpecOptions> = new Map([
  [
    "ki",
    {
      owner: "amy",
      stateAuthorityDetail:
        "Ki's owned content pages (books/anime/reviews), RLS-owned by her accountUserId",
    },
  ],
  [
    "jenny",
    {
      owner: "atlas",
      stateAuthorityDetail:
        "Jenny's owned Atlas content pages (location/location-collection/collection), RLS-owned by her accountUserId",
    },
  ],
])

function declaredSpecs(): readonly OnDemandAgentSpec[] {
  return gameSeatSpecs(gameSeatsIn(ROOT))
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
    const options = PERSON_HANDLER_OPTIONS.get(person.slug)
    const spec = personHandlerSpec(person.persona, person.slug, ROOT, options)
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
