import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { getPage, getPages } from "@akasha/pages-access/get"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { Suspense } from "react"
import { data } from "react-router"
import { readServedWatcherVersion } from "../.server/served-watcher-version/served-watcher-version.module.code.ts"
import {
  readReportedBuild,
  summarizeWatcherBuild,
} from "../watcher-build-status/watcher-build-status.module.code.ts"
import { WatcherPageContent } from "../watcher-page-content/watcher-page-content.module.code.tsx"
import {
  readReportedOperations,
  summarizeWatcherRun,
} from "../watcher-run-status/watcher-run-status.module.code.ts"
import {
  summarizeWatcherSync,
  type WatcherSyncSourceCounts,
} from "../watcher-sync-status/watcher-sync-status.module.code.ts"
import type { Route } from "./+types/watcher"

export function meta() {
  return [{ title: "Temper | Watcher" }]
}

function isoInstant(value: unknown): string | null {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) return null
  return value
}

async function readSource(
  pageTypeSlug: string,
  userId: string,
  captureKey?: string
): Promise<WatcherSyncSourceCounts> {
  const result = await getPages({
    pageTypeSlug,
    where: [{ key: "userId", eq: userId }],
    select: captureKey === undefined ? ["updatedAt"] : ["updatedAt", captureKey],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 1,
    withCount: true,
  })
  const newest = result.rows[0]
  const contact = newest?.updatedAt
  return {
    count: result.count ?? result.rows.length,
    lastContactAt: typeof contact === "string" ? contact : null,
    capturedAt: captureKey === undefined ? null : isoInstant(newest?.[captureKey]),
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = createServerClient(request)
  const { user, headers: userHeaders } = await getUser(request)
  for (const [k, v] of userHeaders) {
    if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
  }

  if (!user) return data({ sync: null, build: null, run: null }, { headers })

  const [enrolment, characters, inventory] = await Promise.all([
    getPage({
      pageTypeSlug: "temper-watcher-enrolment",
      where: [{ key: "accountPage", eq: user.id }],
      select: ["tokenCreatedAt", "lastRunOutcome"],
    }),
    readSource("temper-account-character", user.id),
    readSource("temper-inventory-snapshot", user.id, "capturedAt"),
  ])

  const createdAt = enrolment?.tokenCreatedAt
  const sync = summarizeWatcherSync({
    connectedAt: typeof createdAt === "string" ? createdAt : null,
    characters,
    inventory,
  })

  const build = summarizeWatcherBuild({
    targetVersion: readServedWatcherVersion(),
    ...readReportedBuild(enrolment?.lastRunOutcome),
  })

  const run = summarizeWatcherRun(readReportedOperations(enrolment?.lastRunOutcome))

  return data({ sync, build, run }, { headers })
}

export default function WatcherPage({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 160 })} />}>
      <WatcherPageContent sync={loaderData.sync} build={loaderData.build} run={loaderData.run} />
    </Suspense>
  )
}
