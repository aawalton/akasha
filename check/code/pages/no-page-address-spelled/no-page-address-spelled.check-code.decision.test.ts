import { expect, test } from "bun:test"
import { addressed } from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.code.ts"
import {
  ADDRESS,
  GENERATED,
  given,
  HELD,
  JUDGING,
  PAGE,
  ROOT,
  reasonsIn,
  SCOPED,
  UNCOMMITTED,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.test-fixtures.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

test("a body spelling a page's address is refused, naming the address", () => {
  const said = reasonsIn(given(HELD, `const AT = "${ADDRESS}"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${ADDRESS}\``)
  expect(said[0]).toContain("spells a page's address")
})

test("a scoped address is refused as a qualified one is", () => {
  expect(reasonsIn(given(HELD, `const AT = "${SCOPED}"\n`))).toHaveLength(1)
})

test("each spelling is named on its own", () => {
  const body = `const a = "${ADDRESS}"\nconst b = "${pageType.slug}/${module.slug}"\n`
  expect(reasonsIn(given(HELD, body))).toHaveLength(2)
})

test("a string opening with no page type is no address", () => {
  expect(addressed(JUDGING.pageTypes, "nowhere/held")).toBeNull()
  expect(reasonsIn(given(HELD, 'const AT = "nowhere/held"\n'))).toEqual([])
})

test("a string naming no page that is there is passed over", () => {
  expect(addressed(JUDGING.pageTypes, "module/gone")).not.toBeNull()
  expect(reasonsIn(given(HELD, 'const AT = "module/gone"\n'))).toEqual([])
})

test("a bare slug is no address", () => {
  expect(addressed(JUDGING.pageTypes, "held")).toBeNull()
})

test("an id is no address", () => {
  expect(addressed(JUDGING.pageTypes, "01a04e11-9f98-775b-846d-a9985a5ebd21")).toBeNull()
})

test("a specifier is no address, because its slug carries a dot", () => {
  const body = 'import { held } from "akasha/command-system/held.module.code.ts"\n'
  expect(reasonsIn(given(HELD, body))).toEqual([])
  expect(addressed(JUDGING.pageTypes, "module/held.module.code.ts")).toBeNull()
})

test("a string whose slug is not lower kebab case is no address", () => {
  expect(addressed(JUDGING.pageTypes, "module/Held")).toBeNull()
  expect(addressed(JUDGING.pageTypes, "module/held one")).toBeNull()
  expect(addressed(JUDGING.pageTypes, "module/")).toBeNull()
})

test("a string parted more than twice is no address", () => {
  expect(addressed(JUDGING.pageTypes, "page-property/module/code/more")).toBeNull()
})

test("a page is passed over", () => {
  const body = `export const held = { parts: ["${ADDRESS}"] }\n`
  expect(reasonsIn(given(PAGE, body))).toEqual([])
})

test("a generated body is passed over", () => {
  expect(reasonsIn(given(GENERATED, `const AT = "${ADDRESS}"\n`))).toEqual([])
})

test("an uncommitted body is passed over", () => {
  expect(reasonsIn(given(UNCOMMITTED, `const AT = "${ADDRESS}"\n`))).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", `${ADDRESS}\n`))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: HELD, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow(HELD)
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})
