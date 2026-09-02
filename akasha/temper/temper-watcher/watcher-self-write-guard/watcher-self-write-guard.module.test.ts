import { expect, test } from "bun:test"
import { hashContent, shouldSkipSelfWrite } from "./watcher-self-write-guard.module.code.ts"

test("the same content hashes the same way twice", () => {
  expect(hashContent("a")).toBe(hashContent("a"))
})

test("content differing at all hashes differently", () => {
  expect(hashContent("a")).not.toBe(hashContent("b"))
})

test("a hash is the sha256 of the content in hex", () => {
  expect(hashContent("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
})

test("a write-back never recorded is no reason to skip", () => {
  expect(shouldSkipSelfWrite(hashContent("a"), null)).toBe(false)
})

test("content matching the last write-back is skipped", () => {
  const hash = hashContent("a")
  expect(shouldSkipSelfWrite(hash, hash)).toBe(true)
})

test("content differing from the last write-back is not skipped", () => {
  expect(shouldSkipSelfWrite(hashContent("a"), hashContent("b"))).toBe(false)
})

test("content differing only in its line endings hashes differently", () => {
  expect(hashContent("a\n")).not.toBe(hashContent("a\r\n"))
})
