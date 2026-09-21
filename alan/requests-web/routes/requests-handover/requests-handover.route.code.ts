import { landFromHandover } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

export async function loader({ request }: { request: Request }) {
  throw await landFromHandover(REQUESTS_SITE, request)
}
