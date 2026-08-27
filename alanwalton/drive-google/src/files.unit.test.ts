import { describe, expect, test } from "bun:test"
import { InputError } from "@shared/errors-core/exit"
import { isNativeGoogleDoc, parseDriveFileId } from "./files"

const ID = "1AbC_dEf-GhIjKlMnOpQrStUvWxYz012345"

describe("parseDriveFileId", () => {
  test("extracts the id from a /file/d/<id>/view share URL", () => {
    expect(parseDriveFileId(`https://drive.google.com/file/d/${ID}/view?usp=sharing`)).toBe(ID)
  })

  test("extracts the id from an open?id=<id> URL", () => {
    expect(parseDriveFileId(`https://drive.google.com/open?id=${ID}`)).toBe(ID)
  })

  test("extracts the id from a uc?export=download&id=<id> URL", () => {
    expect(parseDriveFileId(`https://drive.google.com/uc?export=download&id=${ID}`)).toBe(ID)
  })

  test("prefers the ?id= query param over a /d/ path segment when both are present", () => {
    expect(parseDriveFileId(`https://drive.google.com/uc?id=${ID}&export=download`)).toBe(ID)
  })

  test("extracts the id from a docs.google.com document URL", () => {
    expect(parseDriveFileId(`https://docs.google.com/document/d/${ID}/edit`)).toBe(ID)
  })

  test("accepts a bare file id", () => {
    expect(parseDriveFileId(ID)).toBe(ID)
  })

  test("trims surrounding whitespace and a single pair of wrapping quotes", () => {
    expect(parseDriveFileId(`  '${ID}'  `)).toBe(ID)
    expect(parseDriveFileId(`"https://drive.google.com/file/d/${ID}/view"`)).toBe(ID)
  })

  test("throws InputError on empty input", () => {
    expect(() => parseDriveFileId("   ")).toThrow(InputError)
  })

  test("throws InputError on a non-Drive string that is neither URL nor id-shaped", () => {
    expect(() => parseDriveFileId("not an id")).toThrow(InputError)
  })

  test("throws InputError when a URL carries no recoverable file id", () => {
    expect(() => parseDriveFileId("https://drive.google.com/drive/my-drive")).toThrow(InputError)
  })

  test("throws InputError on a too-short bare token (below the 10-char id floor)", () => {
    expect(() => parseDriveFileId("abc123")).toThrow(InputError)
  })
})

describe("isNativeGoogleDoc", () => {
  test("true for native Google app mime types", () => {
    expect(isNativeGoogleDoc("application/vnd.google-apps.document")).toBe(true)
    expect(isNativeGoogleDoc("application/vnd.google-apps.spreadsheet")).toBe(true)
  })

  test("false for uploaded binary mime types", () => {
    expect(isNativeGoogleDoc("image/png")).toBe(false)
    expect(isNativeGoogleDoc("application/pdf")).toBe(false)
  })

  test("false when the mime type is unknown/undefined", () => {
    expect(isNativeGoogleDoc(undefined)).toBe(false)
  })
})
