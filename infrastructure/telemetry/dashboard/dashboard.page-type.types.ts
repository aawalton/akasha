import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { DashboardLayout } from "akasha/infrastructure/telemetry/dashboard/properties/dashboard-layout.file-property.types.ts"

export type Dashboard = Domain & {
  layout: DashboardLayout
}
