import {
  handlerDerives,
  principalIsPerson,
  refuseAnswering,
} from "akasha/agents/seats/modules/answering/seat-answering.module.code.ts"
import { seatByName } from "akasha/agents/seats/modules/by-name/seat-by-name.module.code.ts"
import {
  composeSeatName,
  FLEET,
  FLEX,
  personaDefaultsOf,
  principals,
} from "akasha/agents/seats/modules/compose-seat-name/compose-seat-name.module.code.ts"
import {
  isValidSeatName,
  resolveOptionalSeatId,
} from "akasha/agents/seats/modules/handle/seat-handle.module.code.ts"
import { launchSeatUnderTmux } from "akasha/agents/seats/modules/launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { DEFAULT_ACCOUNT } from "akasha/agents/seats/modules/launching/seat-launching.module.code.ts"
import {
  isSeatMode,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  SEAT_MODES,
} from "akasha/agents/seats/modules/modes/seat-modes.module.code.ts"
import { mintNamedAgent } from "akasha/agents/seats/modules/name-bind/seat-name-bind.module.code.ts"
import { refuseHeldName } from "akasha/agents/seats/modules/name-held-refusal/seat-name-held-refusal.module.code.ts"
import { refuseParentless } from "akasha/agents/seats/modules/parentless-refusal/seat-parentless-refusal.module.code.ts"
import { composedNameOf } from "akasha/agents/seats/modules/rename/seat-rename.module.code.ts"
import { defaultFor } from "akasha/agents/seats/modules/resolve/seat-resolve.module.code.ts"
import {
  compositionOf,
  decideSpawnName,
} from "akasha/agents/seats/modules/spawn-name-decide/seat-spawn-name-decide.module.code.ts"
import {
  type StatedIdentity,
  spawnSeat,
} from "akasha/agents/seats/modules/spawn-seat/spawn-seat.module.code.ts"
import { stateSpawnedSeat } from "akasha/agents/seats/modules/state-spawned-seat/state-spawned-seat.module.code.ts"
import { resolveStatedIdentity } from "akasha/agents/seats/modules/stated-identity/seat-stated-identity.module.code.ts"
import {
  dataError,
  inputError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import type { StatedAgentSlots } from "akasha/seat-system/supervising/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import { readStdinOrFile } from "akasha/utils/fs/read-stdin-or-file/read-stdin-or-file.module.code.ts"

export interface StartSeatInput {
  readonly startMode: string
  readonly persona?: string
  readonly role?: string
  readonly domain?: string
  readonly principal?: string
  readonly flex?: string
  readonly initiative?: string | null
  readonly account?: string
  readonly prompt?: string
  readonly modelOverride?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
  readonly parent?: string | null
}

export interface StartedSeat {
  readonly agentId: string
  readonly name: string
  readonly startMode: string
  readonly pid?: number
}

function readFlexValue(raw: string | undefined): string | null {
  if (raw === undefined) return null
  if (!FLEX.test(raw)) {
    throw inputError(
      `invalid --flex '${raw}': a flex value is \`flex-\` and a number, which is what keeps it out of every vocabulary`
    )
  }
  return raw
}

export async function startSeat(input: StartSeatInput, done: string[] = []): Promise<StartedSeat> {
  const startMode = input.startMode
  if (!isSeatMode(startMode)) {
    throw inputError(
      `invalid --start-mode '${startMode}' (expected ${SEAT_MODES.map((one) => `'${one}'`).join(" or ")})`
    )
  }
  const headless = startMode === SEAT_MODE_HEADLESS

  const root = rootFor(resolveRoots(), AKASHA)
  const stated: { -readonly [K in keyof StatedAgentSlots]: StatedAgentSlots[K] } = {}
  for (const slot of ["persona", "role", "domain"] as const) {
    const value = input[slot]?.trim()
    if (value !== undefined && value !== "") stated[slot] = value
  }

  const derived = handlerDerives(root, stated.role ?? null, stated.domain ?? null)
  if (stated.persona === undefined && derived.persona !== null) stated.persona = derived.persona

  const askedPrincipal = input.principal?.trim()
  if (askedPrincipal !== undefined && !principals(root).includes(askedPrincipal)) {
    throw inputError(
      `invalid --principal '${askedPrincipal}': a seat's output is produced for one of ${principals(root).join(", ")}`
    )
  }
  const principal = askedPrincipal ?? derived.principal ?? (headless ? FLEET : undefined)

  const answering = refuseAnswering(root, {
    persona: stated.persona ?? null,
    principal: principal ?? null,
  })
  if (answering.length > 0) throw inputError(answering.join(" "))
  if (principal !== undefined) stated.principal = principal

  const parent = input.parent === undefined ? await resolveOptionalSeatId(undefined) : input.parent
  const orphaned = refuseParentless(parent, !principalIsPerson(root, principal ?? null))
  if (orphaned !== null) throw inputError(orphaned)

  if (stated.persona !== undefined) {
    const defaults = personaDefaultsOf(root, stated.persona)
    if (defaults !== null) {
      if (stated.role === undefined && defaults.role !== null) stated.role = defaults.role
      if (stated.domain === undefined && defaults.domain !== null) stated.domain = defaults.domain
    }
  }

  let roleIsDefault = false
  if (stated.role === undefined) {
    const fallback = defaultFor("role", root)
    if (fallback !== null) {
      stated.role = fallback
      roleIsDefault = true
    }
  }

  const flex = readFlexValue(input.flex)

  const statedIdentity: StatedIdentity = {
    persona: stated.persona,
    domain: stated.domain,
    role: stated.role,
  }
  const unresolved = await resolveStatedIdentity(statedIdentity)
  if (unresolved !== null) throw inputError(unresolved)

  const spelled = composeSeatName(
    {
      attributes: {
        persona: stated.persona ?? null,
        domain: stated.domain ?? null,
        role: stated.role ?? null,
      },
      flex,
      principal: principal ?? null,
    },
    root
  )
  const composed = compositionOf({ spelled, role: stated.role ?? null, roleIsDefault })
  const named = decideSpawnName({ composed })
  if (named.kind === "reject") throw inputError(named.reason)
  const name = named.name
  if (!isValidSeatName(name)) {
    throw inputError(
      `invalid seat name '${name}' (expected lowercase kebab-case, length 2-128, must contain non-hex letter)`
    )
  }

  const account = input.account ?? DEFAULT_ACCOUNT

  if (headless) {
    const prompt = input.prompt
    if (prompt === undefined || prompt.length === 0) {
      throw inputError("--prompt / --prompt-file payload is empty")
    }
    const handle = await spawnSeat({
      name,
      prompt,
      account,
      parent,
      statedIdentity,
      principal: principal ?? null,
      flex,
      initiative: input.initiative ?? null,
      modelOverride: input.modelOverride,
      anthropicBaseUrl: input.anthropicBaseUrl,
      anthropicAuthToken: input.anthropicAuthToken,
    })
    done.push(`spawned ${handle.agentId} in \`${handle.name}\`, headless, at pid ${handle.pid}`)
    return { agentId: handle.agentId, name: handle.name, startMode, pid: handle.pid }
  }

  const held = refuseHeldName(seatByName(name))
  if (held !== null) throw dataError(held)

  const agentId = await mintNamedAgent(name)
  done.push(`bound \`${name}\` to the fresh agent ${agentId}`)

  const unstated = await stateSpawnedSeat({
    agentId,
    mode: startMode,
    principal: principal ?? null,
    persona: stated.persona,
    domain: stated.domain,
    role: stated.role,
    flex,
    initiative: input.initiative ?? null,
    parentName: parent === null ? null : composedNameOf(parent),
    account,
  })
  if (unstated.length > 0) {
    throw dataError(
      `[seat start] ${name}: nothing was stated, so no page stands for this seat and nothing reads ` +
        `it as running — ${unstated.join("; ")}. A seat with no page composes no prompt, so it is ` +
        "refused here rather than launched blank."
    )
  }
  done.push(`wrote the page for ${agentId}`)
  await launchSeatUnderTmux({ name, agentId, account, prompt: "", mode: startMode })
  done.push(`launched ${agentId} in \`${name}\` under tmux, ${startMode}`)

  return { agentId, name, startMode }
}

export interface StartAsked {
  readonly json?: boolean
  readonly startMode?: string
  readonly promptFile?: string
  readonly seatPrompt?: string
  readonly persona?: string
  readonly role?: string
  readonly seatDomain?: string
  readonly principal?: string
  readonly flex?: string
  readonly initiative?: string
  readonly account?: string
  readonly seatModel?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
}

function written(started: StartedSeat, json: boolean): undefined {
  const { agentId, name, startMode, pid } = started
  if (json) {
    const record = { agent_id: agentId, name, start_mode: startMode }
    const whole = pid === undefined ? record : { ...record, pid }
    process.stdout.write(`${JSON.stringify(whole)}\n`)
    return
  }
  if (pid === undefined) {
    process.stdout.write(`${agentId}\n`)
    return
  }
  process.stdout.write(`${agentId}\t${name}\t${startMode}\n`)
}

export default async function seatStart(asked: StartAsked, done: string[] = []): Promise<void> {
  const startMode = asked.startMode ?? SEAT_MODE_INTERACTIVE

  let prompt: string | undefined
  if (startMode === SEAT_MODE_HEADLESS) {
    prompt =
      asked.promptFile === undefined ? asked.seatPrompt : await readStdinOrFile(asked.promptFile)
  }

  const started = await startSeat(
    {
      startMode,
      persona: asked.persona,
      role: asked.role,
      domain: asked.seatDomain,
      principal: asked.principal,
      flex: asked.flex,
      initiative: asked.initiative ?? null,
      account: asked.account,
      prompt,
      modelOverride: asked.seatModel,
      anthropicBaseUrl: asked.anthropicBaseUrl,
      anthropicAuthToken: asked.anthropicAuthToken,
    },
    done
  )

  written(started, asked.json === true)
}
