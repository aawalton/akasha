import { data } from "react-router"
import { requireJenny } from "../.server/jenny-session/jenny-session.module.code.ts"
import { Shell } from "../jenny-shell/jenny-shell.module.code.tsx"
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
