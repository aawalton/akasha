import { signedOutCookie } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  signOutAction,
  signOutLoader,
} from "akasha/alan/harness/supabase-rr/modules/sign-out-route/sign-out-route.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

export async function action({ request }: { request: Request }) {
  return signOutAction(request, [await signedOutCookie(ARCHIVE_OF_WORLDS_SITE)])
}

export function loader() {
  return signOutLoader()
}
