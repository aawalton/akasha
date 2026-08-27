import { describe, expect, test } from "bun:test"
import { DataError, InputError } from "@shared/errors-core/exit"
import {
  buildQueryRequest,
  buildResolveRequest,
  dedupePaths,
  nextStartRank,
  type PhotoAsset,
  parseQueryPage,
  parseResolveResponse,
  parseShareToken,
  resolveOutputDir,
  type ShareContext,
  safeFilename,
} from "./pull-icloud-core"

const CTX: ShareContext = {
  partition: "https://p66-ckdatabasews.icloud.com:443",
  authToken: "tok/with+special=chars",
  zoneName: "CMM-ABC",
  zoneType: "REGULAR_CUSTOM_ZONE",
  ownerRecordName: "_owner",
}

const IMG_2249_ENC = Buffer.from("IMG_2249.HEIC", "utf8").toString("base64")

function master(recordName: string, filenameEnc: string, downloadURL: string, size: number) {
  return {
    recordType: "CPLMaster",
    recordName,
    fields: {
      filenameEnc: { value: filenameEnc, type: "ENCRYPTED_BYTES" },
      resOriginalRes: { value: { downloadURL, size, fileChecksum: "x" }, type: "ASSETID" },
    },
  }
}

function asset(recordName: string) {
  return {
    recordType: "CPLAsset",
    recordName,
    fields: { assetDate: { value: 1, type: "TIMESTAMP" } },
  }
}

describe("parseShareToken", () => {
  test.each([
    ["https://share.icloud.com/photos/0f6r1MPkeb", "0f6r1MPkeb"],
    ["https://share.icloud.com/photos/0f6r1MPkeb#Starving", "0f6r1MPkeb"],
    ["https://share.icloud.com/photos/0f6r1MPkeb/", "0f6r1MPkeb"],
  ])("extracts token from %s", (url, expected) => {
    expect(parseShareToken(url)).toBe(expected)
  })

  test.each([
    "not a url",
    "https://www.icloud.com/sharedalbum/#B0abc",
    "https://share.icloud.com/",
    "https://share.icloud.com/photos/",
    "https://example.com/photos/abc",
  ])("rejects %s", (url) => {
    expect(() => parseShareToken(url)).toThrow(InputError)
  })
})

describe("buildResolveRequest", () => {
  test("targets the public resolve endpoint with the token as a shortGUID", () => {
    const req = buildResolveRequest("TOK")
    expect(req.url).toContain("/public/records/resolve")
    expect(req.body).toEqual({ shortGUIDs: [{ value: "TOK" }] })
  })
})

describe("parseResolveResponse", () => {
  const raw = {
    results: [
      {
        anonymousPublicAccess: {
          token: "TOKEN",
          databasePartition: "https://p66-ckdatabasews.icloud.com:443",
          tokenTTL: 1200000,
        },
        zoneID: { zoneName: "CMM-ABC", zoneType: "REGULAR_CUSTOM_ZONE", ownerRecordName: "_owner" },
        extraIgnoredField: true,
      },
    ],
  }

  test("extracts partition, token, and zone into a ShareContext", () => {
    expect(parseResolveResponse(raw)).toEqual({
      partition: "https://p66-ckdatabasews.icloud.com:443",
      authToken: "TOKEN",
      zoneName: "CMM-ABC",
      zoneType: "REGULAR_CUSTOM_ZONE",
      ownerRecordName: "_owner",
    } satisfies ShareContext)
  })

  test.each([
    {},
    { results: [] },
    { results: [{ zoneID: {} }] },
  ])("throws DataError on malformed %o", (bad) => {
    expect(() => parseResolveResponse(bad)).toThrow(DataError)
  })
})

describe("buildQueryRequest", () => {
  test("targets the shared query endpoint on the partition host with remapEnums + token", () => {
    const req = buildQueryRequest(CTX, 0)
    expect(req.url).toStartWith("https://p66-ckdatabasews.icloud.com:443/")
    expect(req.url).toContain("/shared/records/query")
    expect(req.url).toContain("remapEnums=true")
    expect(req.url).toContain(`publicAccessAuthToken=${encodeURIComponent(CTX.authToken)}`)
  })

  test("encodes startRank and zone into the body", () => {
    const { body } = buildQueryRequest(CTX, 40)
    expect(body.query.recordType).toBe("CPLAssetAndMasterByAssetDateWithoutHiddenOrDeleted")
    expect(body.query.filterBy).toContainEqual({
      fieldName: "startRank",
      comparator: "EQUALS",
      fieldValue: { value: 40, type: "INT64" },
    })
    expect(body.zoneID).toEqual({
      zoneName: "CMM-ABC",
      zoneType: "REGULAR_CUSTOM_ZONE",
      ownerRecordName: "_owner",
    })
  })
})

describe("safeFilename", () => {
  test("decodes a base64 filename", () => {
    expect(safeFilename(IMG_2249_ENC, "rec")).toBe("IMG_2249.HEIC")
  })

  test.each([
    ["", "rec.heic"],
    [Buffer.from("../../etc/passwd", "utf8").toString("base64"), "passwd"],
    [Buffer.from("a/b/c.heic", "utf8").toString("base64"), "c.heic"],
    [Buffer.from("../../../../../instructions/packages/media/cli/src", "utf8").toString("base64"), "rec.heic"],
    [Buffer.from("../../../../../instructions/packages/media/cli/src/media", "utf8").toString("base64"), "rec.heic"],
  ])("sanitizes %p to a safe basename", (enc, expected) => {
    expect(safeFilename(enc, "rec")).toBe(expected)
  })
})

describe("parseQueryPage", () => {
  test("extracts only CPLMaster originals, skipping CPLAsset records", () => {
    const raw = {
      records: [
        master("m1", IMG_2249_ENC, "https://cvws.example/B/CK/${f}?o=1", 1600370),
        asset("a1"),
        master(
          "m2",
          Buffer.from("IMG_2250.HEIC", "utf8").toString("base64"),
          "https://cvws.example/B/CK2/${f}",
          900
        ),
        asset("a2"),
      ],
      syncToken: "s",
    }
    expect(parseQueryPage(raw)).toEqual([
      {
        recordName: "m1",
        filename: "IMG_2249.HEIC",
        downloadURL: "https://cvws.example/B/CK/${f}?o=1",
        size: 1600370,
      },
      {
        recordName: "m2",
        filename: "IMG_2250.HEIC",
        downloadURL: "https://cvws.example/B/CK2/${f}",
        size: 900,
      },
    ])
  })

  test("empty records → empty asset list", () => {
    expect(parseQueryPage({ records: [] })).toEqual([])
  })

  test("throws DataError when the envelope is malformed", () => {
    expect(() => parseQueryPage({})).toThrow(DataError)
  })

  test("throws DataError when a CPLMaster lacks the original resource", () => {
    const raw = { records: [{ recordType: "CPLMaster", recordName: "m1", fields: {} }] }
    expect(() => parseQueryPage(raw)).toThrow(DataError)
  })
})

describe("nextStartRank", () => {
  test.each([
    [0, 12, 12],
    [12, 200, 212],
    [200, 200, 400],
  ])("rank %i + %i assets → %i", (rank, count, expected) => {
    expect(nextStartRank(rank, count)).toBe(expected)
  })

  test.each([0, 12, 400])("empty page at rank %i terminates", (rank) => {
    expect(nextStartRank(rank, 0)).toBeUndefined()
  })
})

describe("resolveOutputDir", () => {
  test("defaults to cwd", () => {
    expect(resolveOutputDir(undefined, "/work")).toBe("/work")
  })
  test("resolves a relative dir against cwd", () => {
    expect(resolveOutputDir("album", "/work")).toBe("/work/album")
  })
  test("keeps an absolute dir", () => {
    expect(resolveOutputDir("/abs/dir", "/work")).toBe("/abs/dir")
  })
})

describe("dedupePaths", () => {
  const mk = (filename: string): PhotoAsset => ({
    recordName: filename,
    filename,
    downloadURL: `https://x/${filename}`,
    size: 1,
  })

  test("pairs each asset with an absolute path, preserving order", () => {
    const targets = dedupePaths([mk("a.heic"), mk("b.heic")], "/out")
    expect(targets.map((t) => t.path)).toEqual(["/out/a.heic", "/out/b.heic"])
  })

  test("disambiguates duplicate filenames instead of overwriting", () => {
    const targets = dedupePaths([mk("IMG.heic"), mk("IMG.heic"), mk("IMG.heic")], "/out")
    expect(targets.map((t) => t.path)).toEqual([
      "/out/IMG.heic",
      "/out/IMG-2.heic",
      "/out/IMG-3.heic",
    ])
  })
})
