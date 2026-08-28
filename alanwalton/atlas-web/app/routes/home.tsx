import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"

export function meta() {
  return [{ title: "Atlas" }]
}

export default function HomeRoute() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Atlas</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="mx-auto max-w-2xl py-12 text-center">
          <p className="text-lg text-secondary">Welcome to your Atlas.</p>
          <p className="text-secondary text-sm">
            Your content will appear here as it is added. Use the sidebar to navigate between
            collections once they exist.
          </p>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
