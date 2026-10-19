import { expect, test } from "bun:test"
import { droppedForLanding } from "akasha/temper/addon/pages/catalog/modules/catalog-landed-drop/catalog-landed-drop.module.code.ts"
import type { CatalogPayload } from "akasha/temper/catalog/core/modules/catalog-payload/catalog-payload.module.code.ts"
import type { DomainKey } from "akasha/temper/catalog/core/modules/domain-keys/domain-keys.module.code.ts"

const NOW = "eso.live.12.1.6.3309674"

const KEYS: readonly DomainKey[] = ["recipeCatalog", "skillCatalog"]

const MARK = { apiVersion: NOW, invalidateVersion: 7 }

const RECIPES = { 1: "a list" }

const SKILLS = { 2: "a line" }

function held(over: Partial<CatalogPayload> = {}): CatalogPayload {
  const savedVars: CatalogPayload = {
    completed: true,
    apiVersion: NOW,
    lastSeenInvalidateVersion: 7,
    ...over,
  }
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  tables.recipeCatalog = RECIPES
  tables.skillCatalog = SKILLS
  return savedVars
}

test("a catalog landed for this version and invalidation is kept as the mark alone", () => {
  const savedVars = held()
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  expect(droppedForLanding(savedVars, KEYS, () => MARK)).toEqual(KEYS)
  expect(tables.recipeCatalog).toEqual({ landed: true })
  expect(tables.skillCatalog).toEqual({ landed: true })
})

test("a catalog the config names nothing for is kept whole", () => {
  const savedVars = held()
  const markOf = (key: DomainKey) => (key === "skillCatalog" ? MARK : undefined)
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  expect(droppedForLanding(savedVars, KEYS, markOf)).toEqual(["skillCatalog"])
  expect(tables.recipeCatalog).toEqual(RECIPES)
})

test("a mark for another game version keeps the catalog whole", () => {
  const savedVars = held({ apiVersion: "eso.live.12.2.0.1" })
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  expect(droppedForLanding(savedVars, KEYS, () => MARK)).toHaveLength(0)
  expect(tables.skillCatalog).toEqual(SKILLS)
})

test("a mark from before the latest invalidation keeps the catalog whole", () => {
  const savedVars = held({ lastSeenInvalidateVersion: 8 })
  expect(droppedForLanding(savedVars, KEYS, () => MARK)).toHaveLength(0)
})

test("a catalog not collected, or already the mark, is left as it is", () => {
  const savedVars = held()
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  tables.recipeCatalog = undefined
  tables.skillCatalog = { landed: true }
  expect(droppedForLanding(savedVars, KEYS, () => MARK)).toHaveLength(0)
  expect(tables.recipeCatalog).toBeUndefined()
  expect(tables.skillCatalog).toEqual({ landed: true })
})
