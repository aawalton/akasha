import { DesignSystemPageContent } from "@akasha/design-system/design-system-page-content"
import type { Route } from "./+types/design"

export function meta() {
  return [{ title: "Design System" }]
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const tab = url.searchParams.get("tab") ?? undefined
  return { tab }
}

export default function DesignRoute({ loaderData }: Route.ComponentProps) {
  return <DesignSystemPageContent initialTab={loaderData.tab} />
}
