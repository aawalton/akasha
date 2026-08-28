import { PageTitle } from "@shared/design-layout/components/page-layout"
import { PanelCard } from "@shared/design-layout/components/panel-card"

export function meta() {
  return [
    { title: "Contact — Alan Walton" },
    {
      name: "description",
      content: "Contact Alan Walton — email and phone.",
    },
  ]
}

export default function ContactRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Contact</PageTitle>
          <p className="text-secondary text-sm">Reach Alan Walton by email or phone.</p>
        </header>

        <PanelCard id="contact" title="Contact information">
          <ul className="space-y-2 text-secondary text-sm">
            <li>
              Email:{" "}
              <a href="mailto:alan@alanwalton.com" className="text-accent underline">
                alan@alanwalton.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+18445122550" className="text-accent underline">
                844-512-2550
              </a>
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
