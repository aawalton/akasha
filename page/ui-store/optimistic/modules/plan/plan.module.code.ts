import type { JsonPatch } from "akasha/page/access/modules/types/types.module.code.ts"
import type { PageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import type { Json } from "akasha/utils/narrow/modules/json-value/json-value.module.code.ts"

export interface RowOverlay {
  readonly attributes?: Readonly<Record<string, Json>>
  readonly attributesPatch?: JsonPatch
  readonly promoted?: Partial<PageRow>
}

export type PagesMutationPlan =
  | { readonly kind: "create"; readonly row: PageRow }
  | {
      readonly kind: "patch"
      readonly rowId: string
      readonly overlay: RowOverlay
      readonly predictedSet?: Readonly<Record<string, Json>>
    }
  | {
      readonly kind: "upsert"
      readonly rowId: string
      readonly row: PageRow
      readonly overlay: RowOverlay
      readonly predictedSet?: Readonly<Record<string, Json>>
    }
  | { readonly kind: "delete"; readonly rowId: string }
