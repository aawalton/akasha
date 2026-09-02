import { requireFirst } from "@akasha/utils-narrow/require-first"
import type {
  CharacterRecipeProgress,
  CharacterScribingProgress,
  RecipeDetail,
  RecipeListProgressEntry,
  ScribingKnowledgeItem,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface AccountRecipeUnionProgress {
  entries: readonly RecipeListProgressEntry[]
  knownCount: number
  totalCount: number
}

export function transformAccountRecipeUnion(
  recipeProgress: readonly CharacterRecipeProgress[]
): AccountRecipeUnionProgress {
  if (recipeProgress.length === 0) {
    return { entries: [], knownCount: 0, totalCount: 0 }
  }

  const knownIds = new Set<number>()
  for (const cp of recipeProgress) {
    for (const entry of cp.entries) {
      for (const recipe of entry.recipes) {
        if (recipe.known) knownIds.add(recipe.itemId)
      }
    }
  }

  const template = requireFirst(recipeProgress)
  let knownCount = 0
  let totalCount = 0

  const entries: RecipeListProgressEntry[] = template.entries.map((entry) => {
    let listKnown = 0
    const recipes: RecipeDetail[] = entry.recipes.map((r) => {
      const known = knownIds.has(r.itemId)
      totalCount++
      if (known) {
        knownCount++
        listKnown++
      }
      return { itemId: r.itemId, name: r.name, known }
    })
    const listTotal = recipes.length
    return {
      listIndex: entry.listIndex,
      name: entry.name,
      knownCount: listKnown,
      totalCount: listTotal,
      percent: listTotal > 0 ? Math.round((listKnown / listTotal) * 100) : 0,
      recipes,
    }
  })

  return { entries, knownCount, totalCount }
}

export interface AccountScribingUnionProgress {
  grimoires: readonly ScribingKnowledgeItem[]
  focusScripts: readonly ScribingKnowledgeItem[]
  signatureScripts: readonly ScribingKnowledgeItem[]
  affixScripts: readonly ScribingKnowledgeItem[]
  unlockedCount: number
  totalCount: number
}

function unionScribingCategory(
  progressEntries: readonly CharacterScribingProgress[],
  key: "grimoires" | "focusScripts" | "signatureScripts" | "affixScripts"
): readonly ScribingKnowledgeItem[] {
  const unlockedNames = new Set<string>()
  for (const cp of progressEntries) {
    for (const item of cp[key]) {
      if (item.unlocked) unlockedNames.add(item.name)
    }
  }

  const template = requireFirst(progressEntries)[key]
  return template.map((item) => ({
    name: item.name,
    unlocked: unlockedNames.has(item.name),
  }))
}

export function transformAccountScribingUnion(
  scribingProgress: readonly CharacterScribingProgress[]
): AccountScribingUnionProgress {
  if (scribingProgress.length === 0) {
    return {
      grimoires: [],
      focusScripts: [],
      signatureScripts: [],
      affixScripts: [],
      unlockedCount: 0,
      totalCount: 0,
    }
  }

  const grimoires = unionScribingCategory(scribingProgress, "grimoires")
  const focusScripts = unionScribingCategory(scribingProgress, "focusScripts")
  const signatureScripts = unionScribingCategory(scribingProgress, "signatureScripts")
  const affixScripts = unionScribingCategory(scribingProgress, "affixScripts")

  const all = [...grimoires, ...focusScripts, ...signatureScripts, ...affixScripts]
  let unlockedCount = 0
  for (const item of all) {
    if (item.unlocked) unlockedCount++
  }

  return {
    grimoires,
    focusScripts,
    signatureScripts,
    affixScripts,
    unlockedCount,
    totalCount: all.length,
  }
}
