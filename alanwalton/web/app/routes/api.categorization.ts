import { readBacklogCountScale } from "@akasha/readout-system/readout-scale-reading"
import { STALE_AFTER_MS } from "@shared/monarch-categorization-access/ring-reading"
import { READOUT_CACHE_CONTROL } from "../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import { readingAged } from "../../../../akasha/readout-system/readout-reading/readout-reading.module.code.ts"
import { relayedHeld } from "../../../../akasha/readout-system/readout-relay/readout-relay.module.code.ts"
import { readNoneLeft } from "~/readout/lib/readout.server"
import { guardRingReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.categorization"

const UNREVIEWED_READOUT_SLUG = "unreviewed"

const UNREVIEWED_READOUT = "monarch-unreviewed-transactions"

function unreviewedRelayed(now: Date = new Date()): number | null {
  const held = relayedHeld(UNREVIEWED_READOUT)
  if (held === null) return null
  return readingAged(held, now) >= STALE_AFTER_MS ? null : held.value
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardRingReadout(request)
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
