import { SITE_DOCUMENT } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PhrasesSeeded } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import type { SeededPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { webPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { Outlet, useRouteLoaderData } from "react-router"

const READ = [SITE_DOCUMENT, webPhrase.slug]

const ROOT = "root"

const NO_PHRASES: readonly SeededPhrase[] = []

export function SiteDocumentHead() {
  useLoaderFollowing(READ)
  const phrases =
    useRouteLoaderData<{ readonly phrases?: readonly SeededPhrase[] }>(ROOT)?.phrases ?? NO_PHRASES
  return (
    <PhrasesSeeded phrases={phrases}>
      <Outlet />
    </PhrasesSeeded>
  )
}
