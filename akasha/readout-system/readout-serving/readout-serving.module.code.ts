import { askingFor } from "@akasha/pages-system-service/calling"
import {
  READOUT_CACHE_CONTROL,
  RING_CREDENTIAL_HEADER,
  refuseWithoutSecret,
} from "../readout-credential/readout-credential.module.code.ts"
import { noneLeftIn, stated } from "../readout-none-left/readout-none-left.module.code.ts"
import {
  type Reading,
  readingAged,
  readingOn,
  STALE_AFTER_MS,
} from "../readout-reading/readout-reading.module.code.ts"
import { relayedHeld } from "../readout-relay/readout-relay.module.code.ts"
import { readScale } from "../readout-scale-reading/readout-scale-reading.module.code.ts"

const READOUT = "readout"

export const NO_READING = { ok: false, error: "No reading." } as const

export type RingAdmission = (request: Request) => Response | null | Promise<Response | null>

export type HeldReading =
  | { readonly held: "fresh"; readonly value: number }
  | { readonly held: "stale" }
  | { readonly held: "none" }

export function refuseUncredentialedRingCaller(
  request: Request,
  credential: string | undefined
): Response | null {
  return refuseWithoutSecret(request, RING_CREDENTIAL_HEADER, credential)
}

function heldWithin(kept: Reading | null, now: Date): HeldReading {
  if (kept === null) return { held: "none" }
  if (readingAged(kept, now) >= STALE_AFTER_MS) return { held: "stale" }
  return { held: "fresh", value: kept.value }
}

export function readingHeldFor(readoutSlug: string, now: Date = new Date()): HeldReading {
  return heldWithin(relayedHeld(readoutSlug), now)
}

export function readingHeldOn(
  values: Readonly<Record<string, unknown>>,
  now: Date = new Date()
): HeldReading {
  return heldWithin(readingOn(values), now)
}

export function relayedFresh(readoutSlug: string, now: Date = new Date()): number | null {
  const reading = readingHeldFor(readoutSlug, now)
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

  const value = relayedFresh(readoutSlug)
  if (value === null) return noReading()

  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { slug: { is: readoutSlug } },
  })
  if ("refused" in asked) return noReading()

  const [row] = asked.rows
  if (row === undefined) return noReading()

  const wireKey = stated(row.wireKey)
  if (wireKey === undefined) return noReading()

  const scaleSlug = stated(row.scaleSlug)
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
