import {
  buildReadoutRefusal,
  presentsSecret,
  READOUT_CACHE_CONTROL,
  RELAY_SECRET_HEADER,
} from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  keepRelayed,
  parseRelayed,
  RELAY_SECRET_NAME,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import type { Route } from "./+types/readout-relay.route.code"

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

  if (!presentsSecret(request, RELAY_SECRET_HEADER, optionalEnv(RELAY_SECRET_NAME))) {
    return buildReadoutRefusal()
  }

  const carried = parseRelayed(await request.json().catch(() => null))
  if (carried === null) {
    return Response.json(NO_READING_IN_THE_BODY, {
      status: 400,
      headers: { "Cache-Control": READOUT_CACHE_CONTROL },
    })
  }

  const why = await keepRelayed(carried)
  if (why !== null) {
    return Response.json(
      { ok: false, error: why },
      { status: 502, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }

  return Response.json(
    { ok: true, readout: carried.readout, at: carried.at },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}
