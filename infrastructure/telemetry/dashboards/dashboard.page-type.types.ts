import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { DashboardLayout } from "akasha/infrastructure/telemetry/dashboards/properties/dashboard-layout.file-property.ts"

export type Dashboard = Domain & {
  layout: DashboardLayout
}
