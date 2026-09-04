import { PageTitle } from "@akasha/design-layout/page-layout"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Heading } from "@akasha/design-primitives/heading"

export function meta() {
  return [
    { title: "Terms — Alan Walton" },
    {
      name: "description",
      content: "Terms for the Amy personal-assistant messaging service, operated by Alan Walton.",
    },
  ]
}

export default function TermsRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Terms</PageTitle>
          <p className="text-secondary text-sm">
            Terms for the Amy personal-assistant messaging service, operated by Alan Walton.
          </p>
        </header>

        <PanelCard id="who" title="Who we are">
          <p className="text-secondary text-sm">
            Amy is the personal-assistant messaging service of Alan Walton, a sole proprietor.
            Messages are sent on Alan Walton&rsquo;s behalf to coordinate with the people he works
            and communicates with.
          </p>
        </PanelCard>

        <PanelCard id="what" title="What the messages are">
          <div className="space-y-3">
            <Heading variant="subsection-accent">
              Two-way texts for scheduling, reminders, and coordination.
            </Heading>
            <p className="text-secondary text-sm">
              Messages are conversational and transactional &mdash; scheduling, reminders, and
              day-to-day coordination. This is not a marketing service and not a bulk-messaging
              service.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="consent" title="Consent &amp; opt-in">
          <p className="text-secondary text-sm">
            Recipients are known individuals who gave explicit prior consent &mdash; both verbal and
            written &mdash; to receive these messages. There is no public sign-up form, and the
            recipient set is closed: no one is added without first giving that prior consent.
          </p>
        </PanelCard>

        <PanelCard id="opt-out" title="Opt-out &amp; help">
          <div className="space-y-3">
            <Heading variant="subsection-accent">
              Reply STOP to stop; reply HELP for help/contact.
            </Heading>
            <p className="text-secondary text-sm">
              You can opt out of messages at any time by replying <strong>STOP</strong>. Reply{" "}
              <strong>HELP</strong> for help or contact information.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="frequency" title="Message frequency">
          <p className="text-secondary text-sm">
            Message frequency is low and varies &mdash; approximately 100 messages per month.
          </p>
        </PanelCard>

        <PanelCard id="rates" title="Rates">
          <p className="text-secondary text-sm">Message and data rates may apply.</p>
        </PanelCard>

        <PanelCard id="privacy" title="Privacy">
          <p className="text-secondary text-sm">
            Phone numbers and message content are used only to provide the service and are not sold
            or shared with third parties. See the full{" "}
            <a href="/privacy" className="text-accent underline">
              Privacy Policy
            </a>
            .
          </p>
        </PanelCard>
      </div>
    </main>
  )
}
