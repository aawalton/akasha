import { signInAt } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader({ request }: { request: Request }) {
  throw redirect(signInAt(REQUESTS_SITE, request))
}
