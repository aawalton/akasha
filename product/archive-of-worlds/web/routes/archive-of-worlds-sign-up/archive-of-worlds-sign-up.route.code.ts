import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader(): Response {
  return redirect(ARCHIVE_OF_WORLDS_SITE.signInPath)
}
