import { redirectSignedInHome } from "akasha/alan/web/signed-in-redirect/signed-in-redirect.module.code.ts"
import { PageTitle } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { Heading } from "akasha/design/interfaces/primitives/heading/heading.module.code.tsx"
import { Link } from "react-router"

export function meta() {
  return [
    { title: "Alan Walton" },
    {
      name: "description",
      content:
        "Alan Walton — sole proprietor operating a personal-assistant service, including the Amy SMS text line for scheduling, reminders, and coordination.",
    },
  ]
}

export async function loader({ request }: { request: Request }) {
  return redirectSignedInHome(request)
}

const PAGES = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/sms", label: "Messaging & SMS opt-in" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const

export default function LandingRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Alan Walton</PageTitle>
          <p className="text-secondary text-sm">
            Alan Walton is a sole proprietor operating a personal-assistant service. The service
            includes <strong>Amy</strong>, an SMS text line used for scheduling, reminders, and
            day-to-day coordination with the people he works with.
          </p>
        </header>

        <PanelCard id="what-we-do" title="What we do">
          <div className="space-y-3">
            <Heading variant="subsection-accent">
              A personal-assistant service for scheduling, reminders, and coordination.
            </Heading>
            <p className="text-secondary text-sm">
              Amy sends two-way, conversational text messages on Alan Walton&rsquo;s behalf to
              coordinate with people who have opted in. It is not a marketing service and not a
              bulk-messaging service.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="more" title="More information">
          <ul className="space-y-1 text-sm">
            {PAGES.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="text-accent underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </main>
  )
}
