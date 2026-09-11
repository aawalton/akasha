import { PageTitle } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"

const EMAIL_LINK_HTML =
  '<!--email_off--><a class="text-accent underline" href="mailto:alan@alanwalton.com">alan@alanwalton.com</a><!--/email_off-->'

export function meta() {
  return [
    { title: "Contact — Alan Walton" },
    {
      name: "description",
      content: "Contact Alan Walton — email and business address.",
    },
  ]
}

export default function ContactRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Contact</PageTitle>
          <p className="text-secondary text-sm">
            Reach Alan Walton by email, or write to the business address below.
          </p>
        </header>

        <PanelCard id="contact" title="Contact information">
          <ul className="space-y-2 text-secondary text-sm">
            <li>
              Email: <span dangerouslySetInnerHTML={{ __html: EMAIL_LINK_HTML }} />
            </li>
            <li>
              Business address:{" "}
              <address className="inline not-italic">1350 Apple Ave, Provo, UT 84604</address>
            </li>
          </ul>
        </PanelCard>

        <PanelCard id="messaging" title="Messaging opt-out">
          <p className="text-secondary text-sm">
            If you receive texts from the Amy assistant line, reply <strong>STOP</strong> at any
            time to opt out, or <strong>HELP</strong> for help. Full messaging terms and privacy
            details are at{" "}
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
