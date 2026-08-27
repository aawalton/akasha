import type { Fetcher } from "@shared/pages-query"
import {
  type DailyValues,
  getDailyPerfectDay as dailyPerfectDay,
  getDailyStoplightFaces as dailyStoplightFaces,
  getDailyValues as dailyValues,
  type PerfectDay,
  type PersonaDaily,
  readPersonaDaily as personaDaily,
  type ValueStoplightFace,
} from "../../../readouts/daily-stoplights.ts"
import {
  type InboxStoplight,
  getInboxStoplights as inboxStoplights,
  getInboxStoplightTiers as inboxStoplightTiers,
} from "../../../readouts/inbox-stoplights.ts"
import {
  type PersonaDayColour,
  type PersonaStoplight,
  getPersonaDayColours as personaDayColours,
  getPersonaStoplights as personaStoplights,
} from "../../../readouts/persona-stoplights.ts"
import type { Ask } from "../../../readouts/readout-resolver.ts"
import {
  getSafetyStoplightTiers as safetyStoplightTiers,
  getSurplusStoplightTiers as surplusStoplightTiers,
  type UpkeepStoplight,
  getUpkeepStoplights as upkeepStoplights,
  getUpkeepStoplightTiers as upkeepStoplightTiers,
} from "../../../readouts/upkeep-stoplights.ts"
import { askVia } from "./ask-through"

export interface DayArgs {
  readonly day: string
  readonly fetcher?: Fetcher
}

function asked(args: DayArgs): { readonly day: string; readonly ask: Ask } {
  return { day: args.day, ask: askVia(args.fetcher) }
}

export async function getUpkeepStoplightTiers(args: DayArgs): Promise<readonly UpkeepStoplight[]> {
  return upkeepStoplightTiers(asked(args))
}

export async function getUpkeepStoplights(args: DayArgs): Promise<string> {
  return upkeepStoplights(asked(args))
}

export async function getSafetyStoplightTiers(
  args: DayArgs
): Promise<readonly UpkeepStoplight[]> {
  return safetyStoplightTiers(asked(args))
}

export async function getSurplusStoplightTiers(
  args: DayArgs
): Promise<readonly UpkeepStoplight[]> {
  return surplusStoplightTiers(asked(args))
}

export async function getInboxStoplightTiers(args: DayArgs): Promise<readonly InboxStoplight[]> {
  return inboxStoplightTiers(asked(args))
}

export async function getInboxStoplights(args: DayArgs): Promise<string> {
  return inboxStoplights(asked(args))
}

export async function getDailyStoplightFaces(
  args: DayArgs
): Promise<readonly ValueStoplightFace[]> {
  return dailyStoplightFaces(asked(args))
}

export async function getDailyValues(args: DayArgs): Promise<DailyValues> {
  return dailyValues(asked(args))
}

export async function getDailyPerfectDay(args: DayArgs): Promise<PerfectDay> {
  return dailyPerfectDay(asked(args))
}

export async function readPersonaDaily(args: DayArgs): Promise<PersonaDaily[]> {
  return personaDaily(asked(args))
}

export async function getPersonaStoplights(args: DayArgs): Promise<readonly PersonaStoplight[]> {
  return personaStoplights(asked(args))
}

export async function getPersonaDayColours(args: DayArgs): Promise<readonly PersonaDayColour[]> {
  return personaDayColours(asked(args))
}
