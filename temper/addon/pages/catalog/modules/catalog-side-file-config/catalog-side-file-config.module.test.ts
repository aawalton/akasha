import { afterEach, describe, expect, test } from "bun:test"
import {
  getLandedMark,
  getMinedItemsUploaded,
  getPendingInvalidation,
} from "akasha/temper/addon/pages/catalog/modules/catalog-side-file-config/catalog-side-file-config.module.code.ts"

function setConfig(value: unknown): undefined {
  Reflect.set(globalThis, "TemperCatalogConfig", value)
}

afterEach(() => {
  setConfig(undefined)
})

describe("getPendingInvalidation", () => {
  test("well-formed config with named domains → narrowed view", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: ["recipeCatalog"] })
    expect(getPendingInvalidation()).toEqual({
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: ["recipeCatalog"],
    })
  })

  test("absent invalidateDomains → normalised to empty list (the --all encoding)", () => {
    setConfig({ version: 2, invalidateVersion: 5 })
    expect(getPendingInvalidation()).toEqual({
      version: 2,
      invalidateVersion: 5,
      invalidateDomains: [],
    })
  })

  test("absent global → undefined", () => {
    setConfig(undefined)
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("non-object payload → undefined", () => {
    setConfig("corrupt")
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("missing version → undefined", () => {
    setConfig({ invalidateVersion: 3, invalidateDomains: [] })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("non-numeric invalidateVersion → undefined", () => {
    setConfig({ version: 1, invalidateVersion: "3" })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("placeholder version <= 0 → undefined", () => {
    setConfig({ version: 0, invalidateVersion: 3 })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is a non-array → undefined (fail closed)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: "recipeCatalog" })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is an array with a non-string element → undefined (fail closed)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: ["recipeCatalog", 7] })
    expect(getPendingInvalidation()).toBeUndefined()
  })

  test("invalidateDomains is an empty array → preserved (explicit --all)", () => {
    setConfig({ version: 1, invalidateVersion: 3, invalidateDomains: [] })
    expect(getPendingInvalidation()).toEqual({
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: [],
    })
  })
})

describe("getMinedItemsUploaded", () => {
  test("a well-formed upload record is read", () => {
    setConfig({
      version: 1,
      invalidateVersion: 3,
      minedItemsUploaded: { apiVersion: "eso.live.12.1.5", throughItemId: 327000 },
    })
    expect(getMinedItemsUploaded()).toEqual({
      apiVersion: "eso.live.12.1.5",
      throughItemId: 327000,
    })
  })

  test("a side file with no upload record reads as none", () => {
    setConfig({ version: 1, invalidateVersion: 3 })
    expect(getMinedItemsUploaded()).toBeUndefined()
  })

  test("an upload record of the wrong shape reads as none", () => {
    setConfig({
      version: 1,
      invalidateVersion: 3,
      minedItemsUploaded: { apiVersion: "eso.live.12.1.5", throughItemId: "327000" },
    })
    expect(getMinedItemsUploaded()).toBeUndefined()
  })
})

describe("getLandedMark", () => {
  const mark = { apiVersion: "eso.live.12.1.6", invalidateVersion: 7 }

  test("a catalog the config names as landed is read", () => {
    setConfig({ version: 1, invalidateVersion: 3, landedCatalogs: { itemSetCatalog: mark } })
    expect(getLandedMark("itemSetCatalog")).toEqual(mark)
  })

  test("a catalog the config does not name reads as not landed", () => {
    setConfig({ version: 1, invalidateVersion: 3, landedCatalogs: { itemSetCatalog: mark } })
    expect(getLandedMark("skillCatalog")).toBeUndefined()
  })

  test("a config naming no landed catalogs reads as none landed", () => {
    setConfig({ version: 1, invalidateVersion: 3 })
    expect(getLandedMark("itemSetCatalog")).toBeUndefined()
  })

  test("a mark of the wrong shape reads as not landed", () => {
    const wrong = { apiVersion: "eso.live.12.1.6", invalidateVersion: "7" }
    setConfig({ version: 1, invalidateVersion: 3, landedCatalogs: { itemSetCatalog: wrong } })
    expect(getLandedMark("itemSetCatalog")).toBeUndefined()
  })

  test("landed catalogs that are no table read as none landed", () => {
    setConfig({ version: 1, invalidateVersion: 3, landedCatalogs: 5 })
    expect(getLandedMark("itemSetCatalog")).toBeUndefined()
  })
})
