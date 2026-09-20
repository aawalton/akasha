import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader(): Response {
  return redirect(ATLAS_SITE.signInPath)
}

export default function SignUpRoute() {
  return null
}
