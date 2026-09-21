import { landFromHandover } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

export async function loader({ request }: { request: Request }) {
  throw await landFromHandover(JENNY_SITE, request)
}
