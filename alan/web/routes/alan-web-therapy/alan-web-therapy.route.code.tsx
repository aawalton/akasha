import { couplesTherapist } from "akasha/agent/role/pages/couples-therapist.role.ts"
import { couplesTherapy } from "akasha/alan/couples-therapy/couples-therapy.domain.ts"
import {
  personOf,
  whereReadBy,
} from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { displayNameOf } from "akasha/persona/modules/display-name/persona-display-name.module.code.ts"
import { data, Link, redirect } from "react-router"

const SEAT = toPageTypeSlug("seat")

const THERAPY = namedAs("domain", couplesTherapy.slug, null)

const THERAPIST = namedAs("role", couplesTherapist.slug, null)

const TITLE = "Therapy"

type Session = { readonly href: string; readonly name: string }

type TherapyLoaderData = { readonly sessions: readonly Session[] }

const NO_SESSIONS: TherapyLoaderData = { sessions: [] }

function sessionsIn(rows: readonly Row[]): readonly Session[] {
  return rows.flatMap((row) => {
    const id = row["id"]
    const slug = row["slug"]
    if (typeof id !== "string" || typeof slug !== "string" || slug === "") return []
    const persona = row["persona"]
    const named = typeof persona === "string" && persona !== "" ? slugOf(persona) : slug
    const href = buildPageHref({ pageTypeSlug: SEAT, slug, fallbackSlugSource: null, id })
    return [{ href, name: displayNameOf(named) }]
  })
}

export function meta() {
  return [{ title: TITLE }]
}

export async function loader({ request }: { request: Request }) {
  const { user } = await readAlanUser(request)
  if (user === null) throw redirect("/sign-in")
  const personSlug = await personOf(user)
  if (personSlug === null) return data(NO_SESSIONS)
  const held = await whereReadBy(user, SEAT, {
    assignmentSlug: { is: THERAPY },
    role: { is: THERAPIST },
    persons: { has: namedAs("person", personSlug, null) },
  })
  if ("refused" in held) return data(NO_SESSIONS)
  const asked = await askingFor({
    pageTypeSlug: SEAT,
    where: held.where,
    keys: ["id", "slug", "persona"],
  })
  if ("refused" in asked) throw new Error(`the therapy sessions went unread: ${asked.refused}`)
  return data({ sessions: sessionsIn(asked.rows) })
}

export default function TherapyRoute({ loaderData }: { loaderData: TherapyLoaderData }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{TITLE}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        {loaderData.sessions.length === 0 ? (
          <p className="text-secondary text-sm">No therapy session is open to you.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {loaderData.sessions.map((session) => (
              <li key={session.href}>
                <Link
                  to={session.href}
                  className={cn(
                    "flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-colors hover:bg-surface-2",
                    surfaceClass(1)
                  )}
                >
                  <span className="font-medium text-primary">{session.name}</span>
                  <span className="text-secondary text-sm">Couples therapy</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageLayout.Content>
    </PageLayout>
  )
}
