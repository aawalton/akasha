import { alan } from "akasha/alan/alan.domain.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { answeredFor } from "akasha/product/kofi/feature-request/modules/asking/feature-request-asking.module.code.ts"

const PRODUCT = namedAs("domain", alan.slug, null)

export async function action({ request }: { request: Request }): Promise<Response> {
  const contributor = await signedInAs(REQUESTS_SITE, request)
  return answeredFor(request, { product: PRODUCT, contributor })
}
