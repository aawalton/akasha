import { fetchRingCountsFromMonarch } from "../../../../akasha/readout-system/readout/readouts/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"
import { createRingReader } from "@shared/monarch-categorization-access/ring-reading"
import { z } from "zod"
import { readNoneLeft } from "~/readout/lib/readout.server"
import { READOUT_CACHE_CONTROL } from "../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import { guardRingReadout } from "~/readout-credential/lib/readout-credential.server"
import { readBacklogCountScale } from "~/readout-scale/lib/readout-scale.server"
import type { Route } from "./+types/api.categorization"

const monarchCookie = z
  .string()
  .trim()
  .min(1, {
    message:
      "no MONARCH_COOKIE in this pod, so there is no reading to take. It is the whole " +
      "Cookie header from a signed-in session at app.monarch.com, and only Alan can produce one.",
  })

const UNREVIEWED_READOUT_SLUG = "unreviewed"

const ringReader = createRingReader({
  fetchCounts: (now) =>
    fetchRingCountsFromMonarch(monarchCookie.parse(process.env.MONARCH_COOKIE), now),
})

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardRingReadout(request)
  if (refusal !== null) return refusal

  const counts = await ringReader.read()
  if (counts === null) {
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
      ...counts,
      ...(scale === undefined ? {} : { scale }),
      ...(noneLeft.words === undefined ? {} : { noneLeftWords: noneLeft.words }),
      ...(noneLeft.emoji === undefined ? {} : { noneLeftEmoji: noneLeft.emoji }),
    },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}
