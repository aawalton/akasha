import { PageTitle } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"

export function meta() {
  return [
    { title: "Privacy Policy — Alan Walton" },
    {
      name: "description",
      content: "Privacy policy for Alan Walton and the Amy personal-assistant messaging service.",
    },
  ]
}

export default function PrivacyRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Privacy Policy</PageTitle>
          <p className="text-secondary text-sm">
            How the Amy personal-assistant messaging service, operated by Alan Walton, handles
            message data.
          </p>
        </header>

        <PanelCard id="data" title="What we collect and how we use it">
          <div className="space-y-3">
            <p className="text-secondary text-sm">
              The data collected is the phone numbers and message content exchanged with the
              service. This data is used only to provide the personal-assistant messaging service.
              It is not sold and not shared with third parties. No mobile information will be sold
              or shared with third parties for promotional or marketing purposes.
            </p>
            <p className="text-secondary text-sm">
              When you submit the digital opt-in form at{" "}
              <a href="/sms" className="text-accent underline">
                alanwalton.com/sms
              </a>
              , we record your name, mobile number, the fact of your consent, the version of the
              consent wording shown to you, a timestamp, and your IP address and browser user-agent.
              This information is kept as proof that you consented to receive messages. It is used
              only to operate the service and is not sold or shared with third parties.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="retention" title="Retention">
          <p className="text-secondary text-sm">
            Phone numbers and message content are retained only as long as needed to provide the
            service and are handled with reasonable care to keep them private.
          </p>
        </PanelCard>

        <PanelCard id="contact" title="Questions">
          <p className="text-secondary text-sm">
            Questions about this policy or the service? Contact{" "}
            <a href="mailto:alan@alanwalton.com" className="text-accent underline">
              alan@alanwalton.com
            </a>
            . Full messaging terms and consent details are at{" "}
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
