import { describe, expect, test } from "bun:test"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
  withLandedCatalogs,
  withMinedItemsUploaded,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"

const UPLOADED = { apiVersion: "eso.live.12.1.5", throughItemId: 327382 }

const SETS_LANDED = { itemSetCatalog: { apiVersion: "eso.live.12.1.5", invalidateVersion: 7 } }

const SKILLS_LANDED = { skillCatalog: { apiVersion: "eso.live.12.1.5", invalidateVersion: 8 } }

describe("the landed catalogs", () => {
  test("are written and read back", () => {
    const written = serializeSideFile(withLandedCatalogs(undefined, SETS_LANDED))
    expect(parseSideFile(written)?.landedCatalogs).toEqual(SETS_LANDED)
  })

  test("are joined to the catalogs already landed, the newer mark winning", () => {
    const prior = withLandedCatalogs(undefined, SETS_LANDED)
    const later = { itemSetCatalog: { apiVersion: "eso.live.12.1.6", invalidateVersion: 9 } }
    const next = withLandedCatalogs(withLandedCatalogs(prior, SKILLS_LANDED), later)
    expect(next.landedCatalogs).toEqual({ ...SKILLS_LANDED, ...later })
  })

  test("survive a new request and a new upload record", () => {
    const prior = withLandedCatalogs(undefined, SETS_LANDED)
    expect(computeNextSideFile(prior, [], 9).landedCatalogs).toEqual(SETS_LANDED)
    expect(withMinedItemsUploaded(prior, UPLOADED).landedCatalogs).toEqual(SETS_LANDED)
  })

  test("keep the request and upload record they are written beside", () => {
    const prior = withMinedItemsUploaded(
      computeNextSideFile(undefined, ["recipeCatalog"], 5),
      UPLOADED
    )
    const next = withLandedCatalogs(prior, SETS_LANDED)
    expect(next.invalidateDomains).toEqual(["recipeCatalog"])
    expect(next.minedItemsUploaded).toEqual(UPLOADED)
  })

  test("are absent from a file that never had one", () => {
    const written = serializeSideFile(computeNextSideFile(undefined, [], 9))
    expect(parseSideFile(written)?.landedCatalogs).toBeUndefined()
  })
})

describe("the upload record", () => {
  test("is written and read back", () => {
    const written = serializeSideFile(withMinedItemsUploaded(undefined, UPLOADED))
    expect(parseSideFile(written)?.minedItemsUploaded).toEqual(UPLOADED)
  })

  test("keeps the request it is written beside", () => {
    const prior = computeNextSideFile(undefined, ["recipeCatalog"], 5)
    const next = withMinedItemsUploaded(prior, UPLOADED)
    expect(next.invalidateVersion).toBe(prior.invalidateVersion)
    expect(next.invalidateDomains).toEqual(["recipeCatalog"])
  })

  test("survives a new request", () => {
    const prior = withMinedItemsUploaded(undefined, UPLOADED)
    expect(computeNextSideFile(prior, [], 9).minedItemsUploaded).toEqual(UPLOADED)
  })

  test("is absent from a file that never had one", () => {
    const written = serializeSideFile(computeNextSideFile(undefined, [], 9))
    expect(parseSideFile(written)?.minedItemsUploaded).toBeUndefined()
  })
})
