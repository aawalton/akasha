import {
  getDailyStoplightFaces as dailyStoplightFaces,
  type ValueStoplightFace,
} from "readouts/daily-stoplights"
import {
  type InboxStoplight,
  getInboxStoplightTiers as inboxStoplightTiers,
} from "readouts/inbox-stoplights"
import {
  type PersonaStoplight,
  getPersonaStoplights as personaStoplights,
} from "readouts/persona-stoplights"
import type { Ask } from "readouts/readout-resolver"
import {
  getSafetyStoplightTiers as safetyStoplightTiers,
  getSurplusStoplightTiers as surplusStoplightTiers,
  type UpkeepStoplight,
  getUpkeepStoplightTiers as upkeepStoplightTiers,
} from "readouts/upkeep-stoplights"
import { askVia } from "../ask-through/ask-through.module.code.ts"

export interface DayArgs {
  readonly day: string
}

function asked(args: DayArgs): { readonly day: string; readonly ask: Ask } {
  return { day: args.day, ask: askVia() }
}

export async function getUpkeepStoplightTiers(args: DayArgs): Promise<readonly UpkeepStoplight[]> {
  return upkeepStoplightTiers(asked(args))
}

export async function getSafetyStoplightTiers(args: DayArgs): Promise<readonly UpkeepStoplight[]> {
  return safetyStoplightTiers(asked(args))
}

export async function getSurplusStoplightTiers(args: DayArgs): Promise<readonly UpkeepStoplight[]> {
  return surplusStoplightTiers(asked(args))
}

export async function getInboxStoplightTiers(args: DayArgs): Promise<readonly InboxStoplight[]> {
  return inboxStoplightTiers(asked(args))
}

export async function getDailyStoplightFaces(
  args: DayArgs
): Promise<readonly ValueStoplightFace[]> {
  return dailyStoplightFaces(asked(args))
}

export async function getPersonaStoplights(args: DayArgs): Promise<readonly PersonaStoplight[]> {
  return personaStoplights(asked(args))
}
