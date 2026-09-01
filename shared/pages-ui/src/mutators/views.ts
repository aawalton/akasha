import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"

export interface ViewCallbacks {
  onCreateView: (name: string, data: ViewDataJSON) => void
  onDeleteView: (_id: string) => void
  onRenameView: (_id: string, name: string) => void
  onDuplicateView: (sourceId: string) => void
  onUpdateView: (_id: string, updates: Partial<ViewDataJSON>) => void
  onReorderViews: (viewIds: readonly string[]) => void
}
