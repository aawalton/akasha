import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { signInAt } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { redirect } from "react-router"

export function loader({ request }: { request: Request }) {
  throw redirect(signInAt(ATLAS_SITE, request))
}
