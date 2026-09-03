import { PageTitle } from "@akasha/design-layout/page-layout"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Heading } from "@akasha/design-primitives/heading"

export function meta() {
  return [
    { title: "About — Alan Walton" },
    {
      name: "description",
      content:
        "About Alan Walton, sole proprietor, and the Amy personal-assistant messaging service.",
    },
  ]
}

export default function AboutRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>About</PageTitle>
          <p className="text-secondary text-sm">
            Alan Walton is a sole proprietor operating a personal-assistant service.
          </p>
        </header>

        <PanelCard id="who" title="Who we are">
          <p className="text-secondary text-sm">
            The business is Alan Walton, operating as a sole proprietor. Its personal-assistant
            service &mdash; branded <strong>Amy</strong> &mdash; sends text messages on Alan
            Walton&rsquo;s behalf to coordinate with the people he works and communicates with.
          </p>
        </PanelCard>

        <PanelCard id="what" title="What we do">
          <div className="space-y-3">
            <Heading variant="subsection-accent">
              Two-way texts for scheduling, reminders, and coordination.
            </Heading>
            <p className="text-secondary text-sm">
              Messages are conversational and transactional &mdash; scheduling, reminders, and
              day-to-day coordination with known contacts. This is not a marketing service and not a
              bulk-messaging service.
            </p>
          </div>
        </PanelCard>
      </div>
    </main>
  )
}
