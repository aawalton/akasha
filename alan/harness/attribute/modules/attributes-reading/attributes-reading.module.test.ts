import { afterAll, expect, test } from "bun:test"
import { strength } from "akasha/alan/attribute/pages/strength/strength.attribute.ts"
import { wisdom } from "akasha/alan/attribute/pages/wisdom/wisdom.attribute.ts"
import { attributeReadouts } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.code.ts"
import { attributesReading } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const made = scratchWorld()

afterAll(() => made.sweep())

const ID = "01a0d9b0-0000-7000-8000-0000000000"

const ATTRIBUTE = "attribute"

const SERVED_BY = namedAs(module.slug, attributesReading.slug, null)

const STRENGTH = "probe/readouts/probe-strength/probe-strength.readout.ts"

const WISDOM = "probe/readouts/probe-wisdom/probe-wisdom.readout.ts"

const ELSEWHERE = "probe/readouts/probe-elsewhere/probe-elsewhere.readout.ts"

const COUNTING_NOTHING = "probe/readouts/probe-nothing/probe-nothing.readout.ts"

type Stated = Readonly<Record<string, string | readonly string[]>>

function world(pages: Readonly<Record<string, Stated>>): string {
  const root = made.rootFor("attributes-reading-")
  nothingFiled(root)
  Object.entries(pages).forEach(([path, values], at) => {
    const said = Object.entries(values)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(", ")
    writing(root, path, `export const it = { type: "${pageType.slug}/${readout.slug}", ${said} }\n`)
    listedFiled(root, readout.slug, path.split("/").at(-2) ?? "", [{ path, id: `${ID}${at + 10}` }])
  })
  return root
}

test("each attribute is kept on the readout naming it whose page names this module", () => {
  const root = world({
    [STRENGTH]: { servedBy: [SERVED_BY], attribute: namedAs(ATTRIBUTE, strength.slug, null) },
    [WISDOM]: { servedBy: [SERVED_BY], attribute: namedAs(ATTRIBUTE, wisdom.slug, null) },
  })
  expect(attributeReadouts(root)).toEqual(
    new Map([
      [strength.slug, STRENGTH],
      [wisdom.slug, WISDOM],
    ])
  )
})

test("a readout naming an attribute and not this module is not kept on", () => {
  const root = world({
    [ELSEWHERE]: {
      servedBy: ["module/other-reading"],
      attribute: namedAs(ATTRIBUTE, strength.slug, null),
    },
  })
  expect(attributeReadouts(root).size).toBe(0)
})

test("a readout naming this module and no attribute is not kept on", () => {
  const root = world({ [COUNTING_NOTHING]: { servedBy: [SERVED_BY] } })
  expect(attributeReadouts(root).size).toBe(0)
})
