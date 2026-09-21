import { signInAt } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader({ request }: { request: Request }) {
  throw redirect(signInAt(JENNY_SITE, request))
}
