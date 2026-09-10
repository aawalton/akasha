import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Console } from "./properties/console.file-property.ts"
import type { Presence } from "./properties/presence.file-property.ts"
import type { ProxyConsole } from "./properties/proxy-console.file-property.ts"
import type { ProxyErrors } from "./properties/proxy-errors.file-property.ts"

export type Supervisor = Page & {
  console?: Console
  proxyConsole?: ProxyConsole
  proxyErrors?: ProxyErrors
  presence?: Presence
}
