import { expect, test } from "bun:test"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  diesIn,
  sparingOver,
} from "akasha/checks/modules/mortal-sparing/mortal-sparing.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { shaped } from "akasha/pages/indexes/entries/index-entries.module.test-fixtures.ts"

const MORTAL_AT = "held/one.note.ts"

const BESIDE_AT = "held/one.note.prose.md"

const LASTING_AT = "held/one.domain.ts"

const FAULT = "a fault"

const WHY = "the body carries a fault"

const dies = diesIn(shaped({}))

function bodied(held: Readonly<Record<string, string>>): (path: string) => Uint8Array | null {
  const encoder = new TextEncoder()
  return (path) => {
    const said = held[path]
    return said === undefined ? null : encoder.encode(said)
  }
}

function changeOf(
  before: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string>>
): Change {
  const changed = [...new Set([...Object.keys(before), ...Object.keys(after)])]
  return { root: "/repo", changed, before: bodied(before), after: bodied(after) }
}

function faulting(over: Change): readonly Judged[] {
  const decoder = new TextDecoder()
  const said: Judged[] = []
  for (const path of over.changed) {
    const bytes = over.after(path)
    if (bytes === null || !decoder.decode(bytes).includes(FAULT)) continue
    said.push({ path, reason: WHY })
  }
  return said
}

test("a refusal a mortal page already drew is no refusal the change leaves", async () => {
  const change = changeOf({ [MORTAL_AT]: `${FAULT} one` }, { [MORTAL_AT]: `${FAULT} two` })

  expect(await sparingOver(change, dies)(faulting, faulting(change))).toEqual([])
})

test("a refusal a change draws anew over a mortal page refuses that change", async () => {
  const change = changeOf({ [MORTAL_AT]: "clean" }, { [MORTAL_AT]: FAULT })

  expect(await sparingOver(change, dies)(faulting, faulting(change))).toEqual([
    { path: MORTAL_AT, reason: WHY },
  ])
})

test("a refusal over a page that is not mortal refuses the change however old it is", async () => {
  const change = changeOf({ [LASTING_AT]: `${FAULT} one` }, { [LASTING_AT]: `${FAULT} two` })

  expect(await sparingOver(change, dies)(faulting, faulting(change))).toEqual([
    { path: LASTING_AT, reason: WHY },
  ])
})

test("a mortal page the change writes anew draws every refusal its body carries", async () => {
  const change = changeOf({}, { [MORTAL_AT]: FAULT })

  expect(await sparingOver(change, dies)(faulting, faulting(change))).toEqual([
    { path: MORTAL_AT, reason: WHY },
  ])
})

test("a check drawing no refusal over a mortal page runs once", async () => {
  const change = changeOf({ [MORTAL_AT]: "clean" }, { [MORTAL_AT]: "clean" })
  let ran = 0
  const run = (over: Change): readonly Judged[] => {
    ran = ran + 1
    return faulting(over)
  }

  expect(await sparingOver(change, dies)(run, run(change))).toEqual([])
  expect(ran).toBe(1)
})

test("a file is mortal where the page type its own name says is mortal", () => {
  expect(dies(MORTAL_AT)).toBe(true)
  expect(dies(BESIDE_AT)).toBe(true)
  expect(dies(LASTING_AT)).toBe(false)
  expect(dies("held/plain.txt")).toBe(false)
})
