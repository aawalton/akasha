import {
  DEEDS,
  pageTypeAccessFor,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

export async function mayRead(user: object | null, pageTypeSlug: string): Promise<boolean> {
  if (user !== null) return true
  const decided = await pageTypeAccessFor(null, pageTypeSlug, DEEDS.READ)
  return decided.permitted
}
