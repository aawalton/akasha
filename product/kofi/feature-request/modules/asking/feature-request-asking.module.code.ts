import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { phrasingRead } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { featureRequestNoPoints } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-no-points.web-phrase.ts"
import { featureRequestNothingToDo } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-nothing-to-do.web-phrase.ts"
import { featureRequestSignedOut } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-signed-out.web-phrase.ts"
import {
  boostedBy,
  type Landed,
  proposedBy,
} from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"

const PROPOSE = "propose"

const BOOST = "boost"

export const SIGNED_OUT = featureRequestSignedOut.slug

export const NOTHING_TO_DO = featureRequestNothingToDo.slug

export const NO_POINTS = featureRequestNoPoints.slug

type Posting = {
  readonly product: string
  readonly contributor: string | null
}

export function saidIn(body: unknown, key: string): string {
  if (!isRecord(body)) return ""
  const said = body[key]
  return typeof said === "string" ? said : ""
}

export function pointsIn(body: unknown): number | null {
  if (!isRecord(body)) return null
  const said = body["points"]
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said.trim() === "") return null
  const read = Number(said)
  return Number.isFinite(read) ? read : null
}

export async function landedFor(body: unknown, posting: Posting): Promise<Landed> {
  const contributor = posting.contributor
  if (contributor === null) return { refused: SIGNED_OUT }
  const act = saidIn(body, "act")
  if (act === PROPOSE) {
    return proposedBy({ product: posting.product, contributor, ask: saidIn(body, "ask") })
  }
  if (act === BOOST) {
    const points = pointsIn(body)
    if (points === null) return { refused: NO_POINTS }
    return boostedBy({
      product: posting.product,
      contributor,
      request: saidIn(body, "request"),
      points,
    })
  }
  return { refused: NOTHING_TO_DO }
}

async function bodyOf(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return null
  }
}

export async function answeredFor(request: Request, posting: Posting): Promise<Response> {
  const landed = await landedFor(await bodyOf(request), posting)
  if ("refused" in landed) {
    const status = landed.refused === SIGNED_OUT ? 401 : 400
    const phrased = (await phrasingRead())(landed.refused, landed.fills)
    return Response.json({ error: phrased === "" ? landed.refused : phrased }, { status })
  }
  return Response.json({ slug: landed.slug })
}
