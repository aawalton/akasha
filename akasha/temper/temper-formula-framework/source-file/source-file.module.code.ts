import type { Effect } from "../effect/effect.module.code.ts"
import type { SourceCategoryId } from "../source-category/source-category.module.code.ts"

export const createSourceFile = <Template extends { name: string }>() => {
  return <
    K extends string,
    S extends string,
    V extends Template & {
      id: K
      categoryId?: SourceCategoryId
      subcategoryId?: S
      effects: Effect[]
    },
  >(
    data: Record<K, V>
  ) => {
    const list = Object.values<V>(data)
    const ids = list.map((item) => item.id)

    type Bucket = { ids: readonly K[]; list: readonly V[]; data: Record<K, V> }
    const subcategories = list.reduce<Record<S, Bucket>>((acc, item) => {
      const subId = item.subcategoryId
      if (subId) {
        const prev: Bucket = acc[subId] ?? { ids: [], list: [], data: Object.create(null) }
        acc[subId] = {
          ids: [...prev.ids, item.id],
          list: [...prev.list, item],
          data: { ...prev.data, [item.id]: item },
        }
      }
      return acc
    }, Object.create(null))

    return {
      data,
      ids,
      list,
      subcategories,
      has: (id: string): id is K => id in data,
    } as const
  }
}
