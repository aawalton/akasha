import { describe, expect, test } from "bun:test"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
  withMinedItemsUploaded,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"

const UPLOADED = { apiVersion: "eso.live.12.1.5", throughItemId: 327382 }

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
