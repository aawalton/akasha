import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const ALANWALTON_APP_ID = alanwaltonWeb.id
export const ALANWALTON_APP = namedAs(webApp.slug, alanwaltonWeb.slug, null)
