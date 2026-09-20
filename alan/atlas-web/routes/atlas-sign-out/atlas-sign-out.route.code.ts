import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import {
  leaveHandover,
  leavingShown,
} from "akasha/alan/harness/handover-rr/modules/handover-leaving/handover-leaving.module.code.ts"

export async function action() {
  return leaveHandover(ATLAS_SITE)
}

export function loader() {
  return leavingShown(ATLAS_SITE)
}
