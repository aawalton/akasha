import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const ALANWALTON_APP_ID = "019db76e-0b30-7d6a-ae20-7563b44f67dd"
export const ALANWALTON_APP = namedAs(webApp.slug, alanwaltonWeb.slug, null)
