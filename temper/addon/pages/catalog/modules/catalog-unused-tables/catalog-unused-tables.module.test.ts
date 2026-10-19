import { expect, test } from "bun:test"
import { withoutUnusedTables } from "akasha/temper/addon/pages/catalog/modules/catalog-unused-tables/catalog-unused-tables.module.code.ts"

const NOW = "eso.live.12.1.6.3309674"

test("a table nothing collects any longer is removed from the saved variables", () => {
  const savedVars = { completed: true, apiVersion: NOW, questCatalog: { 1: "a zone" } }
  expect(withoutUnusedTables(savedVars)).toEqual(["questCatalog"])
  expect(savedVars.questCatalog).toBeUndefined()
  expect(savedVars.apiVersion).toBe(NOW)
})

test("saved variables holding no such table are left as they are", () => {
  const savedVars = { completed: true, apiVersion: NOW }
  expect(withoutUnusedTables(savedVars)).toHaveLength(0)
  expect(savedVars).toEqual({ completed: true, apiVersion: NOW })
})
