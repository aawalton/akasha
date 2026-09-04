import {
  buildReadoutRefusal,
  presentsSecret,
  READOUT_CACHE_CONTROL,
  RELAY_SECRET_HEADER,
} from "@akasha/readout-system/readout-credential"
import { holdRelayed, RELAY_SECRET_NAME, relayedIn } from "@akasha/readout-system/readout-relay"
import type { Route } from "./+types/api.readout-relay"

const NO_READING_IN_THE_BODY = {
  ok: false,
  error: "No reading.",
} as const

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json(
      { ok: false, error: "A reading is carried in." },
      { status: 405, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }

  if (!presentsSecret(request, RELAY_SECRET_HEADER, process.env[RELAY_SECRET_NAME])) {
    return buildReadoutRefusal()
  }

  const carried = relayedIn(await request.json().catch(() => null))
  if (carried === null) {
    return Response.json(NO_READING_IN_THE_BODY, {
      status: 400,
      headers: { "Cache-Control": READOUT_CACHE_CONTROL },
    })
  }

  holdRelayed(carried)
  return Response.json(
    { ok: true, readout: carried.readout, at: carried.at },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}
