import * as declarations from "akasha/agents/attributes/agent-attributes.module.code.ts"
import { type FlexRecord, flexOf } from "akasha/agents/seats/modules/flex/seat-flex.module.code.ts"
import {
  type InitiativeRecord,
  initiativeOf,
} from "akasha/agents/seats/modules/initiative/seat-initiative.module.code.ts"
import { onCallOf } from "akasha/agents/seats/modules/on-call/seat-on-call.module.code.ts"
import {
  type StatedFromHistory,
  statedFromHistory,
} from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "akasha/agents/seats/modules/page-values/seat-page-values.module.code.ts"
import type { Roots } from "akasha/pages/markdown-page-at/markdown-page-at.module.code.ts"
import type { Principal } from "akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"
import {
  type PrincipalRecord,
  principalOf,
} from "akasha/seat-system/seat-principal/seat-principal.module.code.ts"
import { backfillSeatRecord } from "akasha/seat-system/seat-record/seat-record.module.code.ts"
import {
  type RegistrationRecord,
  registrationAccountOf,
} from "akasha/seat-system/seat-registration-account/seat-registration-account.module.code.ts"
import {
  ROTATED_KEY,
  rotatedOf,
} from "akasha/seat-system/seat-rotated-session/seat-rotated-session.module.code.ts"
import {
  SESSION_KEY,
  type SessionRecord,
  sessionOf,
} from "akasha/seat-system/seat-session/seat-session.module.code.ts"
import {
  TRANSCRIPT_KEY,
  type TranscriptRecord,
  transcriptOf,
} from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"

const OBSERVED = [SESSION_KEY, TRANSCRIPT_KEY, ROTATED_KEY] as const

export function backfillObserved(agent: string): undefined {
  for (const key of OBSERVED) backfillSeatRecord(agent, key, pageTextOf(agent, key))
}

export interface Stated {
  readonly agent: string
  readonly attributes: declarations.Attributes
  readonly assignment: string | null
  readonly flex: FlexRecord | null
  readonly mode: declarations.Mode
  readonly recordedMode: declarations.ModeRecord | null
  readonly principal: PrincipalRecord | null
  readonly onCall: boolean
  readonly initiative: InitiativeRecord | null
  readonly registration: RegistrationRecord | null
  readonly session: SessionRecord | null
  readonly rotated: SessionRecord | null
  readonly transcript: TranscriptRecord | null
}

export function statedOf(agent: string): Stated {
  return {
    agent,
    attributes: declarations.attributesOf(agent),
    assignment: pageTextOf(agent, "domain-slug"),
    flex: flexOf(agent),
    mode: declarations.modeOf(agent),
    recordedMode: declarations.recordedModeOf(agent),
    principal: principalOf(agent),
    onCall: onCallOf(agent),
    initiative: initiativeOf(agent),
    registration: registrationAccountOf(agent),
    session: sessionOf(agent),
    rotated: rotatedOf(agent),
    transcript: transcriptOf(agent),
  }
}

export function pageWouldCompose(stated: Stated): boolean {
  return (
    stated.attributes.persona !== undefined &&
    stated.attributes.domain !== undefined &&
    stated.attributes.role !== undefined &&
    stated.principal !== null &&
    stated.recordedMode !== null &&
    stated.registration !== null
  )
}

function modeIn(said: string | null): declarations.Mode | null {
  return declarations.MODES.find((one) => one === said) ?? null
}

export function mergeHeld(now: Stated, held: StatedFromHistory | null): Stated {
  if (held === null) return now
  const heldMode = modeIn(held.mode)
  const attributes: { -readonly [K in declarations.AttributeKey]?: declarations.Attribute } = {
    ...now.attributes,
  }
  for (const slot of declarations.ATTRIBUTES) {
    const slug = held.set[slot]
    if (attributes[slot] === undefined && slug !== undefined) attributes[slot] = { slug }
  }
  const principal: Principal | null = held.principal
  return {
    ...now,
    attributes,
    assignment: now.assignment ?? held.assignment,
    principal: now.principal ?? (principal === null ? null : { value: principal }),
    onCall: now.onCall || held.onCall,
    initiative: now.initiative ?? (held.initiative === null ? null : { value: held.initiative }),
    recordedMode: now.recordedMode ?? (heldMode === null ? null : { value: heldMode }),
    mode: now.recordedMode === null && heldMode !== null ? heldMode : now.mode,
    registration: now.registration ?? (held.account === null ? null : { value: held.account }),
  }
}

export function fallBackToHistory(now: Stated, seatName: string, roots: Roots): Stated {
  if (pageWouldCompose(now)) return now
  return mergeHeld(now, statedFromHistory(seatName, roots))
}

export interface Said {
  readonly clear: readonly string[]
  readonly flex: string | null
  readonly initiative: string | null
  readonly mode: declarations.Mode | null
  readonly onCall: boolean
  readonly principal: Principal | null
  readonly registration: string | null
}

export function statedNow(agent: string, attributes: declarations.Attributes, said: Said): Stated {
  const now = statedOf(agent)
  const gone = new Set(said.clear)
  const kept = <T>(key: string, held: T | null): T | null => (gone.has(key) ? null : held)
  return {
    agent,
    attributes,
    assignment: now.assignment,
    flex: said.flex === null ? kept("flex", now.flex) : { value: said.flex },
    mode: said.mode ?? now.mode,
    recordedMode: said.mode === null ? now.recordedMode : { value: said.mode },
    principal: said.principal === null ? now.principal : { value: said.principal },
    onCall: said.onCall || (!gone.has("on-call") && now.onCall),
    initiative:
      said.initiative === null ? kept("initiative", now.initiative) : { value: said.initiative },
    registration: said.registration === null ? now.registration : { value: said.registration },
    session: now.session,
    rotated: now.rotated,
    transcript: now.transcript,
  }
}
