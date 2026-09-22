import type { TunnelRouteHostname } from "akasha/domain/properties/tunnel-route-hostname.text-property.types.ts"
import type { TunnelRouteName } from "akasha/domain/properties/tunnel-route-name.text-property.types.ts"
import type { TunnelRouteService } from "akasha/domain/properties/tunnel-route-service.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type TunnelRoutes = List<{
  name: TunnelRouteName
  hostname: TunnelRouteHostname
  service: TunnelRouteService
}>
