import { SITE_DOCUMENT } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { Outlet } from "react-router"

const READ = [SITE_DOCUMENT]

export function SiteDocumentHead() {
  useLoaderFollowing(READ)
  return <Outlet />
}
