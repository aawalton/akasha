import { signInAt } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader({ request }: { request: Request }) {
  throw redirect(signInAt(ARCHIVE_OF_WORLDS_SITE, request))
}
