import { getUser } from "@akasha/supabase-rr/auth-server"
import { z } from "zod"
import { searchPlaces } from "../.server/geoapify-search/geoapify-search.module.code.ts"
import type { Route } from "./+types/api.places.search"

const querySchema = z.object({ q: z.string().min(1).max(200) }).strict()

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401, headers })
  }

  const url = new URL(request.url)
  const parsed = querySchema.safeParse({ q: url.searchParams.get("q") ?? "" })
  if (!parsed.success) {
    return Response.json({ error: "q query parameter is required" }, { status: 400, headers })
  }

  try {
    const candidates = await searchPlaces(parsed.data.q)
    return Response.json({ candidates }, { headers })
  } catch (err) {
    console.error("[atlas/web/api.places.search] geoapify search failed:", err)
    return Response.json({ error: "search-failed" }, { status: 502, headers })
  }
}
