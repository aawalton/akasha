import { PageTitle } from "@akasha/design-layout/page-layout"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Heading } from "@akasha/design-primitives/heading"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { Link, redirect } from "react-router"
import type { Route } from "./+types/landing"

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

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  if (user) throw redirect("/home", { headers })
  return null
}

const pages = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
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
              coordinate with known contacts. It is not a marketing service and not a bulk-messaging
              service.
            </p>
          </div>
        </PanelCard>

        <PanelCard id="more" title="More information">
          <ul className="space-y-1 text-sm">
            {pages.map((page) => (
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
