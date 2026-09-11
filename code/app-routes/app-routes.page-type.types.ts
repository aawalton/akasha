import type { AppLayout } from "akasha/code/app-routes/properties/app-layout.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type AppRoutes = Domain & {
  appLayout?: AppLayout
}
