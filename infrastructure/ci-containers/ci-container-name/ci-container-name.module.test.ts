import { expect, test } from "bun:test"
import {
  akashaTreePath,
  buildContainerName,
  CONTAINER_NAME_MAX_LEN,
  checkoutPath,
  sanitizeDnsName,
  shortCommit,
} from "./ci-container-name.module.code.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

test("a name carries the pipeline sequence, the step name and the short commit", () => {
  expect(buildContainerName("42", "run-checks", COMMIT)).toBe("pe-42-run-checks-0123456")
})

test("a name is lower case and holds nothing outside a dns label", () => {
  expect(sanitizeDnsName("Run Checks/Fast__")).toBe("run-checks-fast")
})

test("a name past the cap is cut and digested rather than left long", () => {
  const long = buildContainerName("42", "x".repeat(120), COMMIT)
  expect(long.length).toBe(CONTAINER_NAME_MAX_LEN)
})

test("two names that differ only past the cut stay distinct", () => {
  const a = buildContainerName("42", `${"x".repeat(120)}a`, COMMIT)
  const b = buildContainerName("42", `${"x".repeat(120)}b`, COMMIT)
  expect(a).not.toBe(b)
})

test("the short commit is the first seven of it", () => {
  expect(shortCommit(COMMIT)).toBe("0123456")
})

test("the akasha tree stands beside the instructions tree rather than under it", () => {
  expect(akashaTreePath(COMMIT)).toBe("/ci-storage/instructions/akasha")
  expect(checkoutPath(COMMIT)).toBe(`/ci-storage/checkouts/${COMMIT}`)
})
