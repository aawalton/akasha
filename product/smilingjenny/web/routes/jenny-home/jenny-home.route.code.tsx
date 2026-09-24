import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { requireJenny } from "akasha/product/smilingjenny/web/.server/jenny-session/jenny-session.module.code.ts"
import { data } from "react-router"

export async function loader({ request }: { request: Request }) {
  const { headers } = await requireJenny(request)
  return data({}, { headers })
}

export default function Home() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Signed in</PageTitle>
      </PageLayout.Header>
    </PageLayout>
  )
}
