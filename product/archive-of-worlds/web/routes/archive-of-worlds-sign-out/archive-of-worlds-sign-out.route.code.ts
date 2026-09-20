import {
  leaveHandover,
  leavingShown,
} from "akasha/alan/harness/handover-rr/modules/handover-leaving/handover-leaving.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

export async function action() {
  return leaveHandover(ARCHIVE_OF_WORLDS_SITE)
}

export function loader() {
  return leavingShown(ARCHIVE_OF_WORLDS_SITE)
}
