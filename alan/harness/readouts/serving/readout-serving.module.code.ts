import { askingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import {
  READOUT_CACHE_CONTROL,
  RING_CREDENTIAL_HEADER,
  refuseWithoutSecret,
} from "../credential/readout-credential.module.code.ts"
import { noneLeftIn, stated } from "../none-left/readout-none-left.module.code.ts"
import { type Reading, readingOn } from "../reading/readout-reading.module.code.ts"
import { relayedHeld } from "../relay/readout-relay.module.code.ts"
import { readScale } from "../scale-reading/readout-scale-reading.module.code.ts"

const READOUT = "readout"

export const NO_READING = { ok: false, error: "No reading." } as const

export type RingAdmission = (request: Request) => Response | null | Promise<Response | null>

export type HeldReading =
  | {
      readonly held: "fresh"
      readonly value: number
      readonly at: string
      readonly fallsPerHour: number
    }
  | { readonly held: "none" }

export function refuseUncredentialedRingCaller(
  request: Request,
  credential: string | undefined
): Response | null {
  return refuseWithoutSecret(request, RING_CREDENTIAL_HEADER, credential)
}

function heldOf(kept: Reading | null): HeldReading {
  if (kept === null) return { held: "none" }
  return { held: "fresh", value: kept.value, at: kept.at, fallsPerHour: kept.fallsPerHour }
}

export function readingHeldFor(readoutSlug: string): HeldReading {
  return heldOf(relayedHeld(readoutSlug))
}

export function readingHeldOn(values: Readonly<Record<string, unknown>>): HeldReading {
  return heldOf(readingOn(values))
}

export function relayedFresh(readoutSlug: string): number | null {
  const reading = readingHeldFor(readoutSlug)
  return reading.held === "fresh" ? reading.value : null
}

export function noReading(): Response {
  return Response.json(NO_READING, {
    status: 503,
    headers: { "Cache-Control": READOUT_CACHE_CONTROL },
  })
}

export async function answerReadoutAdmittedBy(
  request: Request,
  admit: RingAdmission,
  readoutSlug: string
): Promise<Response> {
  const refusal = await admit(request)
  if (refusal !== null) return refusal

  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { slug: { is: readoutSlug } },
  })
  if ("refused" in asked) return noReading()

  const [row] = asked.rows
  if (row === undefined) return noReading()

  const relayed = relayedFresh(readoutSlug)
  const carried = readingHeldOn(row)
  const value = relayed ?? (carried.held === "fresh" ? carried.value : null)
  if (value === null) return noReading()

  const wireKey = stated(row.wireKey)
  if (wireKey === undefined) return noReading()

  const scaleSlug = stated(row.scale)
  const noneLeft = noneLeftIn(row)
  const scale = scaleSlug === undefined ? undefined : await readScale(scaleSlug)

  return Response.json(
    {
      [wireKey]: value,
      ...(scale === undefined ? {} : { scale }),
      ...(noneLeft.words === undefined ? {} : { noneLeftWords: noneLeft.words }),
      ...(noneLeft.emoji === undefined ? {} : { noneLeftEmoji: noneLeft.emoji }),
    },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}

export function answerReadout(
  request: Request,
  credential: string | undefined,
  readoutSlug: string
): Promise<Response> {
  return answerReadoutAdmittedBy(
    request,
    (admitted) => refuseUncredentialedRingCaller(admitted, credential),
    readoutSlug
  )
}
