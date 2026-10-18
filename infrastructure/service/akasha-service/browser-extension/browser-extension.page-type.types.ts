import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { ExtensionSite } from "akasha/infrastructure/service/akasha-service/browser-extension/properties/extension-site.module-property-group.ts"
import type { ExtensionWorker } from "akasha/infrastructure/service/akasha-service/browser-extension/properties/extension-worker.module-property-group.ts"

export type BrowserExtension = AkashaService & {
  worker: ExtensionWorker
  site: ExtensionSite
}
