import { smilingjennyWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/smilingjenny-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const JENNY_APP_ID = smilingjennyWeb.id
export const JENNY_APP = namedAs(webApp.slug, smilingjennyWeb.slug, null)
