import { alanwaltonRequestsWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-requests-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const REQUESTS_APP_ID = "01a0c537-bbd8-7fd6-baa7-e8f951020cfd"
export const REQUESTS_APP = namedAs(webApp.slug, alanwaltonRequestsWeb.slug, null)
