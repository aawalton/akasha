import { timingSafeEqual } from "node:crypto"
import { fetchRingCountsFromRoute } from "@shared/monarch-categorization-access/ring-relay"
import { z } from "zod"
import type { Route } from "./+types/api.categorization"

const ALAN_RING_ROUTE = "https://alanwalton.com/api/categorization"

const RING_CREDENTIAL_HEADER = "X-Ring-Credential"

function constantTimeEquals(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8")
  const right = Buffer.from(b, "utf8")
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

const configuredRingCredential = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === undefined || value === "" ? undefined : value))

export function refuseUncredentialedRingCaller(request: Request): Response | null {
  const expected = configuredRingCredential.parse(process.env["SMILINGJENNY_RING_CREDENTIAL"])
  const presented = request.headers.get(RING_CREDENTIAL_HEADER)
  const admitted =
    expected !== undefined && presented !== null && constantTimeEquals(presented, expected)
  if (admitted) return null
  return Response.json(
    { ok: false, error: "Not authenticated." },
    { status: 401, headers: { "Cache-Control": "no-store" } }
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
