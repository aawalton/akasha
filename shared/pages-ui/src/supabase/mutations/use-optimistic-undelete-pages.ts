import type { DeletePageArgs } from "@shared/pages-access/delete"
import type { Page } from "@shared/pages-core/page-types"

export function useOptimisticUndeletePages(
  mutate: (args: DeletePageArgs) => Promise<readonly Page[]>
) {
  return async (args: DeletePageArgs): Promise<readonly Page[]> => mutate(args)
}
