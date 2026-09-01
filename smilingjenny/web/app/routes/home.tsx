import { data } from "react-router"
import { Shell } from "~/components/shell"
import { requireJenny } from "~/lib/session.server"
import type { Route } from "./+types/home"

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireJenny(request)
  return data({}, { headers })
}

export default function Home() {
  return (
    <Shell title="Signed in">
      <p className="text-base text-secondary">
        This site carries the sign-in the tiles are placed behind, and the readings those tiles
        draw. There is nothing else on it to look at.
      </p>
    </Shell>
  )
}
