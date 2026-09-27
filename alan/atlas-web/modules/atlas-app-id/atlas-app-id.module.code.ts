import { alanwaltonAtlasWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-atlas-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const ATLAS_APP_ID = alanwaltonAtlasWeb.id
export const ATLAS_APP = namedAs(webApp.slug, alanwaltonAtlasWeb.slug, null)
