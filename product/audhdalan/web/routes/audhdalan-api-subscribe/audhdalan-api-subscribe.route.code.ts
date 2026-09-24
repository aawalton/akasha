import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import { STEM_CEILING } from "akasha/page/naming/named-for/modules/page-stem/page-stem.module.code.ts"
import {
  type Found,
  readPages,
  writePages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { z } from "zod"

const BodySchema = z.object({
  email: z.string().trim().email().max(320),
})

const PAGE_TYPE_SLUG = "audhdalan-subscriber"

const WRITER = "audhdalan web <web@audhdalan.com>"

const MESSAGE = "a reader asks to hear when Alan publishes"

const HASHED = "subscriber"

const HASH_HEX = 16

const HIDDEN = "<subscriber>"

const UNKEPT = "Your address could not be kept just now. Please try again later."

export type Road = {
  readonly read: (pages: Parameters<typeof readPages>[0]) => ReturnType<typeof readPages>
  readonly write: (
    pages: Parameters<typeof writePages>[0],
    writer: string,
    message: string
  ) => ReturnType<typeof writePages>
}

const LIVE: Road = {
  read: (pages) => readPages(pages),
  write: (pages, writer, message) => writePages(pages, writer, message),
}

type Kept = { readonly kept: true } | { readonly kept: false; readonly why: string }

function nameable(slug: string): boolean {
  return slug.length <= STEM_CEILING && nameFaultIn(slug) === null
}

async function hashedSlug(address: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(address))
  const hex = [...new Uint8Array(digest)].map((one) => one.toString(16).padStart(2, "0")).join("")
  return `${HASHED}-${hex.slice(0, HASH_HEX)}`
}

export async function slugsFor(address: string): Promise<readonly string[]> {
  const folded = slugOf(address)
  const hashed = await hashedSlug(address)
  return nameable(folded) ? [folded, hashed] : [hashed]
}

function bodyAt(found: Found & { readonly ok: true }, slug: string): string | null | undefined {
  const ending = `/${slug}.${PAGE_TYPE_SLUG}.ts`
  return found.bodies.find((one) => one.path.endsWith(ending))?.content
}

function hidden(why: string, slugs: readonly string[]): string {
  return slugs.reduce((said, slug) => said.replaceAll(slug, HIDDEN), why)
}

async function subscribing(email: string, road: Road = LIVE): Promise<Kept> {
  const address = email.toLowerCase()
  const slugs = await slugsFor(address)
  const found = await road.read(slugs.map((slug) => ({ pageTypeSlug: PAGE_TYPE_SLUG, slug })))
  if (!found.ok) return { kept: false, why: hidden(found.why, slugs) }
  for (const slug of slugs) {
    const content = bodyAt(found, slug)
    if (content === undefined) {
      const written = await road.write(
        [{ pageTypeSlug: PAGE_TYPE_SLUG, slug, values: { email } }],
        WRITER,
        MESSAGE
      )
      return written.ok ? { kept: true } : { kept: false, why: hidden(written.why, slugs) }
    }
    if (content?.toLowerCase().includes(JSON.stringify(address))) return { kept: true }
  }
  return { kept: false, why: "every page this address may be filed under holds another address" }
}

export async function answered(request: Request, road: Road = LIVE): Promise<Response> {
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

  const kept = await subscribing(parsed.data.email, road)
  if (!kept.kept) {
    console.error(`subscribe: a subscriber was not kept — ${kept.why}`)
    return Response.json({ error: UNKEPT }, { status: 503 })
  }
  return Response.json({ ok: true })
}

export async function action({ request }: { request: Request }): Promise<Response> {
  return answered(request)
}
