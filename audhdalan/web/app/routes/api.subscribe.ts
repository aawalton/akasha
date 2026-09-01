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

  // A SUBSCRIBER IS A WHOLE PAGE, AND NOTHING WRITES ONE FROM ITS KEYS. This landed the address
  // with `writePage`, which has refused every call since 4c1f05a264: the store writes a path and
  // a whole body, and nothing renders an `audhdalan-subscriber` page's body out of `title`,
  // `slug` and `email`. Every address typed into the form on audhdalan.com since then has been
  // answered with a failure, and none has been kept.
  //
  // It is said here as a 503 rather than carried back as a 500 from a shim. 503 is the truthful
  // code: the address is well-formed and the site is up — what is missing is the road that lands
  // it. Taking subscribers again means composing the page's body and landing it with `writeFiles`,
  // or through the akasha command line.
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
