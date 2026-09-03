import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { ruleText } from "@akasha/rules-engine/instructions-rule"
import { enforceSpawnAdmission } from "@akasha/utils-system/memory-guard"
import { dataError, inputError, operationalError } from "@tools/lib/exit"
import { FLEET, personaDefaultsOf } from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  type LaunchSeatResult,
  launchSeatUnderTmux,
} from "../launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { principalIsPerson, refuseAnswering } from "../seat-answering/seat-answering.module.code.ts"
import { seatByName } from "../seat-by-name/seat-by-name.module.code.ts"
import { isValidSeatName } from "../seat-handle/seat-handle.module.code.ts"
import { SEAT_MODE_HEADLESS } from "../seat-modes/seat-modes.module.code.ts"
import { mintNamedAgent } from "../seat-name-bind/seat-name-bind.module.code.ts"
import { refuseHeldName } from "../seat-name-held-refusal/seat-name-held-refusal.module.code.ts"
import { refuseParentless } from "../seat-parentless-refusal/seat-parentless-refusal.module.code.ts"
import { composedNameOf } from "../seat-rename/seat-rename.module.code.ts"
import {
  decideSkillTokenGuard,
  DECLARATION_RELATIVE_PATH as SKILL_TOKEN_GUARD_DECLARATION,
} from "../skill-token-guard/skill-token-guard.module.code.ts"
import { stateSpawnedSeat } from "../state-spawned-seat/state-spawned-seat.module.code.ts"

export interface StatedIdentity {
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
}

export interface SpawnSeatInput {
  readonly name: string
  readonly prompt: string
  readonly account: string
  readonly parent: string | null
  readonly statedIdentity?: StatedIdentity
  readonly principal?: string | null
  readonly flex?: string | null
  readonly initiative?: string | null
  readonly modelOverride?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
}

export interface SpawnSeatResult extends LaunchSeatResult {
  readonly agentId: string
  readonly name: string
}

export async function spawnSeat(input: SpawnSeatInput): Promise<SpawnSeatResult> {
  const name = input.name
  if (!isValidSeatName(name)) {
    throw inputError(
      `invalid agent name '${name}' (expected lowercase kebab-case, length 2-128, ` +
        "must contain non-hex letter)"
    )
  }

  const stated = input.statedIdentity ?? {}
  const principal = input.principal ?? FLEET
  const root = rootFor(resolveRoots(), AKASHA)
  const answering = refuseAnswering(root, {
    persona: stated.persona ?? null,
    principal,
  })
  if (answering.length > 0) throw inputError(answering.join(" "))
  const orphaned = refuseParentless(input.parent, !principalIsPerson(root, principal))
  if (orphaned !== null) throw inputError(orphaned)

  const defaults = stated.persona === undefined ? null : personaDefaultsOf(root, stated.persona)
  const role = stated.role ?? defaults?.role ?? undefined
  const domain = stated.domain ?? defaults?.domain ?? undefined

  const skill = decideSkillTokenGuard(input.prompt)
  if (skill.kind === "reject") {
    throw inputError(
      ruleText(skill.reason, "reason", {
        command: "seat start",
        where: SKILL_TOKEN_GUARD_DECLARATION,
        call: "decideSkillTokenGuard",
      })
    )
  }

  try {
    enforceSpawnAdmission(`worker ${name}`)
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }

  const held = refuseHeldName(seatByName(name))
  if (held !== null) throw dataError(held)

  const agentId = await mintNamedAgent(name)

  const unstated = await stateSpawnedSeat({
    agentId,
    mode: SEAT_MODE_HEADLESS,
    principal,
    persona: stated.persona,
    domain,
    role,
    flex: input.flex ?? null,
    initiative: input.initiative ?? null,
    parentName: input.parent === null ? null : composedNameOf(input.parent),
    account: input.account,
  })
  if (unstated.length > 0) {
    console.error(
      `[spawn] ${name}: nothing was stated, so the seat boots holding none of it — ${unstated.join("; ")}`
    )
  }

  let handle: LaunchSeatResult
  try {
    handle = await launchSeatUnderTmux({
      name,
      agentId,
      account: input.account,
      prompt: input.prompt,
      mode: SEAT_MODE_HEADLESS,
      modelOverride: input.modelOverride,
      anthropicBaseUrl: input.anthropicBaseUrl,
      anthropicAuthToken: input.anthropicAuthToken,
    })
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }

  return { agentId, name, pid: handle.pid }
}
