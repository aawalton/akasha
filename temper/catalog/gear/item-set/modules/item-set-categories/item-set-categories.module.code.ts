export function resolveCategoryNames(itemSetId: number): {
  categoryName?: string
  subcategoryName?: string
} {
  const directId = GetItemSetCollectionCategoryId(itemSetId)
  if (directId === 0) return {}

  const parentId = GetItemSetCollectionCategoryParentId(directId)
  if (parentId === 0) {
    const name = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
    return { categoryName: name !== "" ? name : undefined }
  }

  let rootId = parentId
  let grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  while (grandParentId !== 0) {
    rootId = grandParentId
    grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  }

  const rootName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(rootId))
  const subName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
  return {
    categoryName: rootName !== "" ? rootName : undefined,
    subcategoryName: subName !== "" ? subName : undefined,
  }
}
