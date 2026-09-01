import {
  READOUT_CACHE_CONTROL,
  refuseWithoutSecret,
  RING_CREDENTIAL_HEADER,
} from "@akasha/readout-system/readout-credential"
import { readNoneLeft } from "@akasha/readout-system/readout-none-left"
import { readingAged, STALE_AFTER_MS } from "@akasha/readout-system/readout-reading"
import { relayedHeld } from "@akasha/readout-system/readout-relay"
import { readBacklogCountScale } from "@akasha/readout-system/readout-scale-reading"
import type { Route } from "./+types/api.categorization"

const UNREVIEWED_READOUT_SLUG = "unreviewed"

const UNREVIEWED_READOUT = "monarch-unreviewed-transactions"

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  return refuseWithoutSecret(
    request,
    RING_CREDENTIAL_HEADER,
    process.env["SMILINGJENNY_RING_CREDENTIAL"]
  )
}

function unreviewedRelayed(now: Date = new Date()): number | null {
  const held = relayedHeld(UNREVIEWED_READOUT)
  if (held === null) return null
  return readingAged(held, now) >= STALE_AFTER_MS ? null : held.value
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = refuseUncredentialedRingCaller(request)
  if (refusal !== null) return refusal

  const unreviewed = unreviewedRelayed()
  if (unreviewed === null) {
    return Response.json(
      { ok: false, error: "No reading." },
      { status: 503, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
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
