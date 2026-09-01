import type { DeletePageArgs } from "@akasha/pages-access/delete"
import type { Page } from "@akasha/pages-core/page-types"

export function useOptimisticUndeletePages(
  mutate: (args: DeletePageArgs) => Promise<readonly Page[]>
) {
  return async (args: DeletePageArgs): Promise<readonly Page[]> => mutate(args)
}
