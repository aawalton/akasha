import {
  READOUT_CACHE_CONTROL,
  RING_CREDENTIAL_HEADER,
  refuseWithoutSecret,
} from "../readout-credential/readout-credential.module.code.ts"
import { readNoneLeft } from "../readout-none-left/readout-none-left.module.code.ts"
import { readingAged, STALE_AFTER_MS } from "../readout-reading/readout-reading.module.code.ts"
import { relayedHeld } from "../readout-relay/readout-relay.module.code.ts"
import { readBacklogCountScale } from "../readout-scale-reading/readout-scale-reading.module.code.ts"

export const UNREVIEWED_READOUT = "monarch-unreviewed-transactions"

export const UNREVIEWED_READOUT_SLUG = "unreviewed"

export const NO_READING = { ok: false, error: "No reading." } as const

export function refuseUncredentialedRingCaller(
  request: Request,
  credential: string | undefined
): Response | null {
  return refuseWithoutSecret(request, RING_CREDENTIAL_HEADER, credential)
}

export function unreviewedRelayed(now: Date = new Date()): number | null {
  const held = relayedHeld(UNREVIEWED_READOUT)
  if (held === null) return null
  return readingAged(held, now) >= STALE_AFTER_MS ? null : held.value
}

export async function answerCategorization(
  request: Request,
  credential: string | undefined
): Promise<Response> {
  const refusal = refuseUncredentialedRingCaller(request, credential)
  if (refusal !== null) return refusal

  const unreviewed = unreviewedRelayed()
  if (unreviewed === null) {
    return Response.json(NO_READING, {
      status: 503,
      headers: { "Cache-Control": READOUT_CACHE_CONTROL },
    })
  }

  const [scale, noneLeft] = await Promise.all([
    readBacklogCountScale(),
    readNoneLeft(UNREVIEWED_READOUT_SLUG),
  ])
  return Response.json(
    {
      unreviewed,
      ...(scale === undefined ? {} : { scale }),
      ...(noneLeft.words === undefined ? {} : { noneLeftWords: noneLeft.words }),
      ...(noneLeft.emoji === undefined ? {} : { noneLeftEmoji: noneLeft.emoji }),
    },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}
