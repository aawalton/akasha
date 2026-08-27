import { writePage } from "@shared/pages-query"
import { z } from "zod"
import type { Route } from "./+types/api.subscribe"

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

export async function action({ request }: Route.ActionArgs): Promise<Response> {
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

  const landed = await writePage(
    "audhdalan-subscriber",
    nameFor(email),
    { title: email, slug: nameFor(email), email },
    WRITER
  )
  if (!landed.ok) {
    return Response.json({ error: `Subscribe failed: ${landed.why}` }, { status: 500 })
  }

  return Response.json({ ok: true })
}
