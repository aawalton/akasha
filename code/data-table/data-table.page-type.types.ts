import type { DataTableCode } from "akasha/code/data-table/properties/data-table-code.code-file-property.types.ts"
import type { DataTableData } from "akasha/code/data-table/properties/data-table-data.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type DataTable = Domain & {
  code?: DataTableCode
  data?: DataTableData
}
