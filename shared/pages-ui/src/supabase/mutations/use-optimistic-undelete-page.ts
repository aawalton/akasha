import type { DeletePageArgs } from "@akasha/pages-access/delete"
import type { Page } from "@akasha/pages-core/page-types"

export function useOptimisticUndeletePage(mutate: (args: DeletePageArgs) => Promise<Page | null>) {
  return async (args: DeletePageArgs): Promise<Page | null> => mutate(args)
}
