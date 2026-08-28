import { PageTitle } from "@shared/design-layout/components/page-layout"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { SmsOptInForm } from "~/sms/opt-in-form"

export function meta() {
  return [
    { title: "Amy — Messaging Terms, Consent & Privacy" },
    {
      name: "description",
      content:
        "Consent, opt-out, and privacy terms for Amy, the personal assistant messaging service of Alan Walton.",
    },
  ]
}

export default function SmsRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Amy — Messaging Terms, Consent &amp; Privacy</PageTitle>
          <p className="text-secondary text-sm">
            Amy is the personal assistant messaging service of Alan Walton. This page describes how
            the service uses SMS text messaging, how recipients consent and opt out, and how message
            data is handled.
          </p>
        </header>

        <PanelCard id="who" title="Who we are">
          <p className="text-secondary text-sm">
            Amy is the personal assistant messaging service of Alan Walton. Messages are sent on
            Alan Walton&rsquo;s behalf to coordinate with the people he works and communicates with.
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
            Recipients give explicit prior consent before any message is sent. Consent is obtained
            in one of two ways: <strong>verbally</strong> &mdash; for the small, closed set of
            personally-known contacts Alan speaks with directly (the script is below) &mdash; or in
            writing via the <strong>digital opt-in form below</strong>. Either way, no number is
            added without that prior consent.
          </p>
        </PanelCard>

        <PanelCard id="opt-in" title="Opt in to messages">
          <div className="space-y-4">
            <p className="text-secondary text-sm">
              To receive text messages from Amy, enter your name and mobile number and check the
              consent box below. This records your written consent. You can reply{" "}
              <strong>STOP</strong> at any time to opt out.
            </p>
            <SmsOptInForm />
          </div>
        </PanelCard>

        <PanelCard id="opt-in-workflow" title="Opt-In Workflow">
          <div className="space-y-3">
            <p className="text-secondary text-sm">
              <strong>Opt-in method:</strong> Explicit consent, obtained either verbally from a
              small fixed set of personally-known individuals, or in writing through the public
              digital opt-in form on this page (the &ldquo;Opt in to messages&rdquo; section above).
              Messaging is limited to the owner and people who have given that explicit consent.
            </p>
            <Heading variant="subsection-accent">How consent is obtained</Heading>
            <ol className="list-decimal space-y-1 pl-5 text-secondary text-sm">
              <li>
                <strong>Verbally:</strong> Alan Walton personally speaks with each prospective
                recipient (in person or by phone) and explains what the line is, obtaining explicit
                agreement <strong>before</strong> any text is sent.
              </li>
              <li>
                <strong>Digital form:</strong> a visitor enters their name and mobile number and
                checks the consent box in the opt-in form above; their written consent is recorded
                with a timestamp.
              </li>
              <li>The same terms are published at alanwalton.com/sms.</li>
              <li>
                Only after the person consents is their number added; the consent is recorded.
              </li>
            </ol>
            <Heading variant="subsection-accent">
              Verbal opt-in script (what recipients hear)
            </Heading>
            <p className="text-secondary text-sm">
              &ldquo;This is Alan. I run a small personal-assistant text line called Amy that I use
              for scheduling, reminders, and coordination &mdash; just between us, not marketing.
              Are you okay with me texting you from my assistant number, 844-512-2550? You&rsquo;ll
              get roughly a few messages a week, you can reply STOP any time to stop, and the full
              terms and privacy are at alanwalton.com/sms. Do I have your okay?&rdquo;
            </p>
            <Heading variant="subsection-accent">
              Disclaimers provided before the first message
            </Heading>
            <ul className="list-disc space-y-1 pl-5 text-secondary text-sm">
              <li>Sender identity: Alan Walton&rsquo;s assistant, &ldquo;Amy&rdquo;.</li>
              <li>
                Purpose: scheduling, reminders, and coordination &mdash; not marketing, not bulk.
              </li>
              <li>Frequency: approximately 100 messages per month.</li>
              <li>&ldquo;Message and data rates may apply.&rdquo;</li>
              <li>
                Opt-out: reply <strong>STOP</strong> to stop, <strong>HELP</strong> for help.
              </li>
              <li>
                Privacy: numbers and message content are used only to provide the service and are
                not sold or shared with third parties.
              </li>
            </ul>
          </div>
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
          <div className="space-y-3">
            <p className="text-secondary text-sm">
              The data collected is the phone numbers and message content exchanged with the
              service. This data is used only to provide the personal assistant messaging service.
              It is not sold and not shared with third parties.
            </p>
            <p className="text-secondary text-sm">
              When you submit the digital opt-in form on this page, we record your name, mobile
              number, the fact and text of your consent, a timestamp, and your IP address and
              browser user-agent. This information is kept as proof that you consented to receive
              messages. It is used only to operate the service and is not sold or shared with third
              parties.
            </p>
            <p className="text-secondary text-sm">
              Phone numbers and message content are retained only as long as needed to provide the
              service and are handled with reasonable care to keep them private.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="contact" title="Contact">
          <p className="text-secondary text-sm">
            Questions about this service or these terms? Contact{" "}
            <a className="text-accent underline" href="mailto:alan@alanwalton.com">
              alan@alanwalton.com
            </a>
            .
          </p>
        </PanelCard>
      </div>
    </main>
  )
}
