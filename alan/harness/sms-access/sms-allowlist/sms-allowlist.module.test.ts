import { describe, expect, test } from "bun:test"
import {
  loadSmsExternalIdentities,
  RELATIONSHIP_PAGE_TYPE_SLUG,
} from "./sms-allowlist.module.code.ts"

describe("loadSmsExternalIdentities", () => {
  test("raises rather than answering that nobody may send", async () => {
    await expect(loadSmsExternalIdentities()).rejects.toThrow("read nowhere")
  })

  test("names the page type nothing answers for", async () => {
    await expect(loadSmsExternalIdentities()).rejects.toThrow(RELATIONSHIP_PAGE_TYPE_SLUG)
  })

  test("says where those pages sit", async () => {
    await expect(loadSmsExternalIdentities()).rejects.toThrow("the old page store")
  })
})
