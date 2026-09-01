import { seaweedFSObjectStoreFromEnv } from "@shared/object-store"
import { askNamed } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { resolveServableImage, serveResolvedImage } from "~/lib/serve-image-object.server"
import { orderedCoverCandidates, type PersonaCoverRow } from "~/lib/wallpaper-candidates"
import type { Route } from "./+types/api.wallpaper"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const PERSONA_QUERY = "persona-all"

function asStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const store = seaweedFSObjectStoreFromEnv()
  if (store === null) return new Response("Object store unavailable", { status: 503 })

  const askedPersonas = await askComposed({
    "page-type": PERSONA_PAGE_TYPE_SLUG,
    keys: ["id", "cover"],
    limit: 1000,
  })
  if (!askedPersonas.ok) throw new Error(`api.wallpaper: ${askedPersonas.why}`)
  const asked = await askNamed(PERSONA_QUERY)
  const stampById = new Map<string, string>()
  for (const row of asked.ok ? asked.answer.rows : []) {
    const id = row.values["id"]
    const stamp = row.values["last-messaged-at"]
    if (typeof id === "string" && typeof stamp === "string") stampById.set(id, stamp)
  }

  const personaRows: PersonaCoverRow[] = askedPersonas.answer.rows.map((row) => {
    const id = typeof row.values["id"] === "string" ? row.values["id"] : String(row.values["id"])
    return {
      id,
      cover: asStringOrNull(row.values["cover"]),
      lastMessagedAt: stampById.get(id) ?? null,
    }
  })

  for (const coverPageId of orderedCoverCandidates(personaRows)) {
    const resolved = await resolveServableImage(store, coverPageId)
    if (resolved !== null) {
      return serveResolvedImage(store, resolved, request, {
        headers: new Headers(),
        cacheControl: "public, max-age=60",
      })
    }
  }
  return new Response("Not Found", { status: 404 })
}
