import { z } from "zod"

const BodySchema = z.object({
  email: z.string().trim().email().max(320),
})

const WRITER = "audhdalan-subscribe"

const OwnerSchema = z.string().uuid()

function nameFor(email: string): string {
  return email
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = BodySchema.safeParse(raw)
  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  const { email } = parsed.data

  if (!OwnerSchema.safeParse(process.env.SUBSCRIBER_OWNER_USER_ID).success) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 })
  }

  console.error(
    `subscribe: \`audhdalan-subscriber/${nameFor(email)}\` was not kept — nothing renders that page's body out of its keys, so ${WRITER} has no way to land one`
  )
  return Response.json(
    {
      error:
        "Subscriptions are not being taken right now. Nothing here can record an address, so yours was not kept — please try again later.",
    },
    { status: 503 }
  )
}
