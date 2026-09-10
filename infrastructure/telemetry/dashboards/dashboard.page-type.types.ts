import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { DashboardLayout } from "./properties/dashboard-layout.file-property.ts"

export type Dashboard = Domain & {
  layout: DashboardLayout
}
