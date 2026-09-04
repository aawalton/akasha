import { PageTitle } from "@akasha/design-layout/page-layout"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Heading } from "@akasha/design-primitives/heading"

export function meta() {
  return [
    { title: "Services — Alan Walton" },
    {
      name: "description",
      content:
        "The Amy personal-assistant messaging service — two-way SMS for scheduling, reminders, and coordination.",
    },
  ]
}

export default function ServicesRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Services</PageTitle>
          <p className="text-secondary text-sm">
            The service Alan Walton offers is a personal-assistant text line, branded{" "}
            <strong>Amy</strong>.
          </p>
        </header>

        <PanelCard id="assistant-messaging" title="Personal-assistant messaging (Amy)">
          <div className="space-y-3">
            <Heading variant="subsection-accent">
              Two-way texts for scheduling, reminders, and coordination.
            </Heading>
            <p className="text-secondary text-sm">
              Amy sends conversational, transactional text messages on Alan Walton&rsquo;s behalf to
              coordinate with the people he works with &mdash; scheduling, reminders, and day-to-day
              coordination. It is not a marketing service and not a bulk-messaging service.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="consent" title="Consent-based, closed recipient set">
          <p className="text-secondary text-sm">
            Recipients are known individuals who gave explicit prior consent &mdash; both verbal and
            written &mdash; to receive these messages. There is no public sign-up form, and the
            recipient set is closed: no one is added without first giving that prior consent.
          </p>
        </PanelCard>

        <PanelCard id="details" title="Message frequency and rates">
          <p className="text-secondary text-sm">
            Message frequency is low and varies &mdash; approximately 100 messages per month.
            Message and data rates may apply. Reply <strong>STOP</strong> at any time to opt out, or{" "}
            <strong>HELP</strong> for help. Full messaging terms, consent, and privacy details are
            published at{" "}
            <a href="/sms" className="text-accent underline">
              alanwalton.com/sms
            </a>
            .
          </p>
        </PanelCard>
      </div>
    </main>
  )
}
