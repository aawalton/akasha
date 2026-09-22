import { alanwaltonAtlasWeb } from "akasha/infrastructure/service/web-app/pages/alanwalton-atlas-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const ATLAS_APP_ID = "019f1562-1437-7be3-a184-3c4165eccb33"
export const ATLAS_APP = namedAs(webApp.slug, alanwaltonAtlasWeb.slug, null)
