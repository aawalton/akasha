import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { CommsRule, OnDemandAgentSpec } from "@akasha/seat-system/seat-wake-rules"
import { handlerSeatName, identityHeardFrom } from "@tools/lib/compose-seat-name"
import {
  type PersonHandlerIdentity,
  personHandlerSpec,
  smsWakeSource,
  standingPersonaSpec,
} from "@tools/lib/wake-armed-specs"

const ROOT = rootFor(resolveRoots(), AKASHA)

export const ALAN_HANDLER_SEAT = handlerSeatName("alan", ROOT)

const ACTION_BOX_AGENT_ID = "019ef9ea-83e2-707e-b1f3-3b70875a8e88"

export const IRIS_SPEC: OnDemandAgentSpec = {
  name: "iris",
  wakeSources: [
    {
      id: "iris-player-action",
      senderMatch: ACTION_BOX_AGENT_ID,
      contentRegex: undefined,
      target: "iris",
      status: "LIVE",
    },
  ],
  stateAuthority: [
    {
      kind: "game-state-rows",
      detail: "Awen game-state / game-turn rows for game externalId 'the-tower'",
    },
    { kind: "bound-worktree", detail: "iris's bound playthrough worktree under ~/worktrees/<seq>" },
  ],
  resumePolicy: { kind: "fresh" },
  owner: "aine",
}

export const ARIA_STAGED_SPEC: OnDemandAgentSpec = {
  name: "aria",
  wakeSources: [
    {
      id: "aria-player-action",
      senderMatch: ACTION_BOX_AGENT_ID,
      contentRegex: undefined,
      target: "aria",
      status: "LIVE",
    },
  ],
  stateAuthority: [
    {
      kind: "game-state-rows",
      detail: "Awen game-state / game-turn rows for game externalId 'dragons-and-dungeons'",
    },
    {
      kind: "bound-worktree",
      detail: "aria's dragons-and-dungeons playthrough worktree under ~/worktrees/<seq>",
    },
  ],
  resumePolicy: { kind: "fresh" },
  owner: "aine",
}

export const KI_HANDLER_SPEC: OnDemandAgentSpec = personHandlerSpec("amy", "ki", ROOT, {
  owner: "amy",
  stateAuthorityDetail:
    "Ki's owned content pages (books/anime/reviews), RLS-owned by her accountUserId",
})

export const KI_HANDLER_WAKE_SOURCE = smsWakeSource(KI_HANDLER_SPEC.name)

export const JENNY_HANDLER_SPEC: OnDemandAgentSpec = personHandlerSpec("claude", "jenny", ROOT, {
  owner: "atlas",
  stateAuthorityDetail:
    "Jenny's owned Atlas content pages (location/location-collection/collection), RLS-owned by her accountUserId",
})

export const JENNY_HANDLER_WAKE_SOURCE = smsWakeSource(JENNY_HANDLER_SPEC.name)

export const SMS_ENTRY_POINT_SPECS: readonly OnDemandAgentSpec[] = [
  KI_HANDLER_SPEC,
  JENNY_HANDLER_SPEC,
]

const DECLARED_SPECS: readonly OnDemandAgentSpec[] = [
  IRIS_SPEC,
  ARIA_STAGED_SPEC,
  ...SMS_ENTRY_POINT_SPECS,
]

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

export function assembleArmedSpecs(
  personaSlugs: readonly string[],
  personaWakeSources: ReadonlyMap<string, readonly CommsRule[]> = new Map(),
  personHandlers: readonly PersonHandlerIdentity[] = []
): readonly OnDemandAgentSpec[] {
  const byName = new Map<string, OnDemandAgentSpec>()
  for (const spec of DECLARED_SPECS) byName.set(spec.name, spec)
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
