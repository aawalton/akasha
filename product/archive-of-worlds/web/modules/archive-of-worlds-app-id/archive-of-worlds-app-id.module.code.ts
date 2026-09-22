import { archiveOfWorldsWeb } from "akasha/infrastructure/service/web-app/pages/archive-of-worlds-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const ARCHIVE_OF_WORLDS_APP_ID = "019db76e-0dd7-7a77-bf38-d9f20ca44ceb"
export const ARCHIVE_OF_WORLDS_APP = namedAs(webApp.slug, archiveOfWorldsWeb.slug, null)
