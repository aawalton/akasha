import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader(): Response {
  return redirect(REQUESTS_SITE.signInPath)
}

export default function SignUpRoute() {
  return null
}
