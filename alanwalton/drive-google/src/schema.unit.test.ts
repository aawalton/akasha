import { describe, expect, test } from "bun:test"
import { driveFileMetadataSchema } from "./schema"

describe("driveFileMetadataSchema", () => {
  test("parses a full files.get metadata response", () => {
    const parsed = driveFileMetadataSchema.parse({
      id: "1AbC",
      name: "starving-student.png",
      mimeType: "image/png",
      size: "48123",
    })
    expect(parsed).toEqual({
      id: "1AbC",
      name: "starving-student.png",
      mimeType: "image/png",
      size: "48123",
    })
  })

  test("tolerates a missing mimeType and size (native-format files omit both)", () => {
    const parsed = driveFileMetadataSchema.parse({ id: "1AbC", name: "Untitled doc" })
    expect(parsed.mimeType).toBeUndefined()
    expect(parsed.size).toBeUndefined()
  })

  test("passes through unconsumed fields (Google adds fields we do not pin)", () => {
    const parsed = driveFileMetadataSchema.parse({
      id: "1AbC",
      name: "x.pdf",
      mimeType: "application/pdf",
      kind: "drive#file",
      md5Checksum: "deadbeef",
    })
    expect(parsed).toMatchObject({ kind: "drive#file", md5Checksum: "deadbeef" })
  })

  test("rejects a response missing the required id", () => {
    expect(() => driveFileMetadataSchema.parse({ name: "x.pdf" })).toThrow()
  })

  test("rejects a response missing the required name (we name the on-disk file after it)", () => {
    expect(() => driveFileMetadataSchema.parse({ id: "1AbC" })).toThrow()
  })

  test("rejects a size encoded as a number rather than Google's decimal string", () => {
    expect(() => driveFileMetadataSchema.parse({ id: "1AbC", name: "x", size: 48123 })).toThrow()
  })
})
