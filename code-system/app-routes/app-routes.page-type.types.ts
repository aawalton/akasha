import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AppLayout } from "./properties/app-layout.code-file-property.ts"

export type AppRoutes = Domain & {
  appLayout?: AppLayout
}
