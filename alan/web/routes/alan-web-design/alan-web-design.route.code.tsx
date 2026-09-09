import { DesignSystemPageContent } from "@akasha/design-system/design-system-page-content"

export function meta() {
  return [{ title: "Design System" }]
}

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const tab = url.searchParams.get("tab") ?? undefined
  return { tab }
}

export default function DesignRoute({ loaderData }: { loaderData: { tab: string | undefined } }) {
  return <DesignSystemPageContent initialTab={loaderData.tab} />
}
