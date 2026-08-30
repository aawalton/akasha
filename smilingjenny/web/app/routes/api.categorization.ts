import {
  refuseWithoutSecret,
  RING_CREDENTIAL_HEADER,
} from "../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import { fetchRingCountsFromRoute } from "@shared/monarch-categorization-access/ring-relay"
import type { Route } from "./+types/api.categorization"

const ALAN_RING_ROUTE = "https://alanwalton.com/api/categorization"

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  return refuseWithoutSecret(
    request,
    RING_CREDENTIAL_HEADER,
    process.env["SMILINGJENNY_RING_CREDENTIAL"]
  )
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = refuseUncredentialedRingCaller(request)
  if (refusal !== null) return refusal
  return serveTheRing()
}

async function serveTheRing(): Promise<Response> {
  const counts = await fetchRingCountsFromRoute(ALAN_RING_ROUTE).catch(() => null)

  if (counts === null) {
    return Response.json(
      { ok: false, error: "No reading." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }

  return Response.json(counts, { headers: { "Cache-Control": "private, max-age=300" } })
}
