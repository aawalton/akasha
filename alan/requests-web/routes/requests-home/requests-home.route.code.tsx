import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"

export function meta() {
  return [{ title: "Requests" }]
}

export default function HomeRoute() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Requests</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="mx-auto max-w-2xl py-12 text-center">
          <p className="text-lg text-secondary">Welcome to Requests.</p>
          <p className="text-secondary text-sm">
            Your content will appear here as it is added. Use the sidebar to navigate between
            collections once they exist.
          </p>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
