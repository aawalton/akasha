import { landFromHandover } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

export async function loader({ request }: { request: Request }) {
  throw await landFromHandover(ARCHIVE_OF_WORLDS_SITE, request)
}
