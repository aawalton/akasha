import {
  leaveHandover,
  leavingShown,
} from "akasha/alan/harness/handover-rr/modules/handover-leaving/handover-leaving.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

export async function action() {
  return leaveHandover(REQUESTS_SITE)
}

export function loader() {
  return leavingShown(REQUESTS_SITE)
}
