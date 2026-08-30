import { expect, test } from "bun:test"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { indexIn } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  editsInPlace,
  landingsIn,
  redirectsIn,
  refusalFor,
} from "./block-akasha-shell-writes.agent-hook.code.ts"

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
  expect(said(`echo hi > ${indexIn("")}/held.jsonl`)).toContain("akasha index refresh")
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

test("an in-place perl edit landing inside akasha is refused", () => {
  expect(said("perl -pi -e 's/a/b/' akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("an in-place sed edit landing inside akasha is refused", () => {
  expect(said("sed -i 's/a/b/' akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("an in-place edit spelled in full is refused as the short flag is", () => {
  expect(said("sed --in-place 's/a/b/' akasha/held.domain.ts")).toContain(
    "inside the akasha folder"
  )
})

test("an in-place flag carrying a suffix is refused", () => {
  expect(said("sed -i.bak 's/a/b/' akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("an in-place edit onto the index is refused, and names the one repair", () => {
  expect(said(`perl -pi -e 's/a/b/' ${indexIn("")}/held.jsonl`)).toContain("akasha index refresh")
})

test("a perl reading akasha without writing it stands", () => {
  expect(said("perl -e 'print' akasha/held.domain.ts")).toBeNull()
})

test("a sed reading akasha without writing it stands", () => {
  expect(said("sed 's/a/b/' akasha/held.domain.ts")).toBeNull()
})

test("an in-place edit outside the guarded roots stands", () => {
  expect(said("perl -pi -e 's/a/b/' /tmp/x")).toBeNull()
})

test("a tee landing inside akasha is refused", () => {
  expect(said("tee akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("a dd naming its out file inside akasha is refused", () => {
  expect(said("dd if=/tmp/x of=akasha/held.domain.ts")).toContain("inside the akasha folder")
})

test("an in-place edit names the tool it was refused for", () => {
  expect(said("perl -pi -e 's/a/b/' akasha/held.domain.ts")).toContain("`perl` lands on")
})

test("an upper-case flag carrying an i is no in-place flag", () => {
  expect(editsInPlace(["perl", "-Ilib", "-e", "print"])).toBe(false)
})
