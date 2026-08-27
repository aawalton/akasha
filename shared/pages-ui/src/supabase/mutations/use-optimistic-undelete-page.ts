import type { DeletePageArgs } from "@shared/pages-access/delete"
import type { Page } from "@shared/pages-core/page-types"

export function useOptimisticUndeletePage(mutate: (args: DeletePageArgs) => Promise<Page | null>) {
  return async (args: DeletePageArgs): Promise<Page | null> => mutate(args)
}
