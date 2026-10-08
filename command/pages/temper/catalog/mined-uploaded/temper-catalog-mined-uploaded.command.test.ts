import { expect, test } from "bun:test"
import {
  type Mined,
  uploadRecordFor,
} from "akasha/command/pages/temper/catalog/mined-uploaded/temper-catalog-mined-uploaded.command.code.ts"

const MINED: Mined = {
  completed: true,
  apiVersion: "eso.live.12.1.5",
  itemIds: [72401, 72402, 227382],
  fullyRead: true,
}

const ALL = new Set([72401, 72402, 227382, 300000])

test("items all in akasha are recorded through the highest id", () => {
  expect(uploadRecordFor(MINED, ALL)).toEqual({
    apiVersion: "eso.live.12.1.5",
    throughItemId: 227382,
  })
})

test("an item missing from akasha refuses the record and is named", () => {
  const said = uploadRecordFor(MINED, new Set([72401, 72402]))
  expect(said).toEqual({ why: "1 mined items have not landed in akasha: 227382" })
})

test("mining that is not complete records nothing", () => {
  expect("why" in uploadRecordFor({ ...MINED, completed: false }, ALL)).toBe(true)
})

test("mined items that could not all be read record nothing", () => {
  expect("why" in uploadRecordFor({ ...MINED, fullyRead: false }, ALL)).toBe(true)
})

test("a capture naming no game version records nothing", () => {
  expect("why" in uploadRecordFor({ ...MINED, apiVersion: undefined }, ALL)).toBe(true)
})

test("a capture with no mined item records nothing", () => {
  expect("why" in uploadRecordFor({ ...MINED, itemIds: [] }, ALL)).toBe(true)
})
