import { expect, test } from "bun:test"
import { rootOf } from "../../hook-answer.module.code.ts"
import { landingsIn, redirectsIn, refusalFor } from "./block-akasha-shell-writes.agent-hook.code.ts"

const ROOT = rootOf(import.meta.path)

function said(command: string): string | null {
  return refusalFor(command, ROOT, ROOT)
}

test("a copy landing inside akasha is refused", () => {
  expect(said("cp /tmp/x akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a move landing inside akasha is refused", () => {
  expect(said("mv /tmp/x akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a redirect landing inside akasha is refused", () => {
  expect(said("echo hi > akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a redirect written against its target is refused", () => {
  expect(said("echo hi >akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("an appending redirect is refused as a truncating one is", () => {
  expect(said("echo hi >> akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a redirect onto the index is refused, and names the one repair", () => {
  expect(said("echo hi > .git/data/index/held.jsonl")).toContain("akasha index refresh")
})

test("a copy out of akasha stands, because it lands outside", () => {
  expect(said("cp akasha/held.domain.ts /tmp/x")).toBeNull()
})

test("a copy into a target directory named by a flag is refused", () => {
  expect(said("cp -t akasha /tmp/x")).toContain("inside the akasha folder")
})

test("a write outside the guarded roots stands", () => {
  expect(said("cp /tmp/a /tmp/b")).toBeNull()
  expect(said("echo hi > /tmp/b")).toBeNull()
})

test("a later segment is judged as the first is", () => {
  expect(said("echo hi && cp /tmp/x akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a path inside a quoted payload is no call", () => {
  expect(said("echo 'cp /tmp/x akasha/held.domain.ts'")).toBeNull()
})

test("a descriptor redirected onto another is no path", () => {
  expect(redirectsIn(["foo", "2>&1"])).toEqual([])
})

test("a copy naming one operand names no target", () => {
  expect(landingsIn("cp akasha/held.domain.ts")).toEqual([])
})

test("a tool reached by a path is that tool", () => {
  expect(said("/usr/bin/cp /tmp/x akasha/held.domain.ts")).toContain("inside the akasha folder")
})
