import { innworldWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/innworld-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const INNWORLD_APP_ID = innworldWeb.id
export const INNWORLD_APP = namedAs(webApp.slug, innworldWeb.slug, null)
