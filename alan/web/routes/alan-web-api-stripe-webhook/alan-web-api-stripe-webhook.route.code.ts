import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { recordsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  balanceOf,
  pointsIn,
} from "akasha/product/kofi/contribution-point/modules/balance/contribution-point-balance.module.code.ts"
import {
  hashOf,
  parseMovement,
} from "akasha/product/kofi/stripe/modules/movement/movement.module.code.ts"
import { verifyStripeSignature } from "akasha/product/kofi/stripe/modules/verify-stripe-signature/verify-stripe-signature.module.code.ts"

const CONTRIBUTOR = "contributor"

const SIGNATURE_HEADER = "stripe-signature"

const SECRET_NAME = "STRIPE_WEBHOOK_SECRET"

const WRITER = "alanwalton web <web@alanwalton.com>"

const EMAIL_HASH = "emailHash"

const CONTRIBUTOR_KEYS: readonly string[] = ["slug", EMAIL_HASH, "balance", "transactions"]

function slugFor(emailHash: string): string {
  return `${CONTRIBUTOR}-${emailHash}`
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const rawBody = await request.text()

  const signingSecret = optionalEnv(SECRET_NAME)
  if (signingSecret === undefined) {
    return Response.json({ error: "no-stripe-webhook-secret" }, { status: 503 })
  }

  const verified = await verifyStripeSignature({
    signingSecret,
    signatureHeader: request.headers.get(SIGNATURE_HEADER),
    rawBody,
    nowMs: Date.now(),
  })
  if (!verified.ok) {
    return Response.json({ error: verified.reason }, { status: 403 })
  }

  let read: ReturnType<typeof parseMovement>
  try {
    read = parseMovement(JSON.parse(rawBody))
  } catch {
    return Response.json({ ok: true, passedOver: "the body is no JSON" })
  }

  if ("passedOver" in read) {
    return Response.json({ ok: true, passedOver: read.passedOver })
  }
  const { chargeId, email, points } = read.movement

  const emailHash = await hashOf(email)
  const slug = slugFor(emailHash)

  const asked = await askingFor({
    pageTypeSlug: CONTRIBUTOR,
    where: { [EMAIL_HASH]: { is: emailHash } },
    keys: CONTRIBUTOR_KEYS,
  })
  if ("refused" in asked) {
    return Response.json({ error: asked.refused }, { status: 503 })
  }

  const already = asked.rows[0]
  const held = already === undefined ? [] : recordsIn(already.transactions)

  if (held.some((one) => one.stripeChargeId === chargeId && pointsIn(one.points) === points)) {
    return Response.json({ ok: true, passedOver: `\`${chargeId}\` moved these points already` })
  }

  const transactions = [...held, { at: new Date().toISOString(), points, stripeChargeId: chargeId }]
  const balance = balanceOf(transactions)

  const wrote = await writingFor({
    writer: WRITER,
    message: `${points} points reach a contributor`,
    pages: [
      {
        pageTypeSlug: CONTRIBUTOR,
        slug,
        merge: true,
        values: { slug, emailHash, balance, transactions },
      },
    ],
  })
  if ("refused" in wrote) {
    return Response.json({ error: wrote.refused }, { status: 503 })
  }

  return Response.json({ ok: true, points, balance })
}
