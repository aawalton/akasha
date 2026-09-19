import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { landFromHandover } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"

export async function loader({ request }: { request: Request }) {
  throw await landFromHandover(ATLAS_SITE, request)
}
