import { seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import {
  resolveServableImage,
  serveResolvedImage,
} from "../.server/serve-image-object/serve-image-object.module.code.ts"
import {
  orderedCoverCandidates,
  type PersonaCoverRow,
} from "../wallpaper-candidates/wallpaper-candidates.module.code.ts"
import type { Route } from "./+types/api.wallpaper"

const PERSONA_PAGE_TYPE_SLUG = "persona"

// TWO QUESTIONS BECAME ONE. This route asked the old engine for every persona's cover, then named
// the `persona-all` saved query a second time only to read `last-messaged-at` off the same
// personas. `askNamed` refuses with 501 now, and the stamp it fetched is `lastMessagedAt` on the
// persona page type, which the pages system service answers alongside the cover. So one ask
// carries both, and the ordering `orderedCoverCandidates` does — most recently messaged first —
// is the ordering it did before.
const EVERY_PERSONA_COVER: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: ["id", "cover", "lastMessagedAt"],
}

function asStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const store = seaweedFSObjectStoreFromEnv()
  if (store === null) return new Response("Object store unavailable", { status: 503 })

  const asked = await askingFor(EVERY_PERSONA_COVER)
  // A REFUSAL IS NOT AN EMPTY WALLPAPER SET. Falling through to the 404 below would tell the
  // caller there is no cover to draw, when what happened is that no cover was read.
  if ("refused" in asked) {
    return new Response(`The personas went unread: ${asked.refused}`, { status: 503 })
  }

  const personaRows: PersonaCoverRow[] = asked.rows.flatMap((row) => {
    const id = asStringOrNull(row.id)
    if (id === null) return []
    return [
      { id, cover: asStringOrNull(row.cover), lastMessagedAt: asStringOrNull(row.lastMessagedAt) },
    ]
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
