import {
  leaveHandover,
  leavingShown,
} from "akasha/alan/harness/handover-rr/modules/handover-leaving/handover-leaving.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

export async function action() {
  return leaveHandover(JENNY_SITE)
}

export function loader() {
  return leavingShown(JENNY_SITE)
}
