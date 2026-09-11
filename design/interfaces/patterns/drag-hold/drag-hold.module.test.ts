import { expect, test } from "bun:test"
import {
  type Dragged,
  type Held,
  letGo,
  tookHold,
} from "akasha/design/interfaces/patterns/drag-hold/drag-hold.module.code.ts"

function eventOf(id: string | number): Dragged {
  return { active: { id } }
}

test("a drag beginning writes the row's id to the ref and to the state together", () => {
  const held: Held = { current: null }
  const said: (string | null)[] = []
  tookHold(eventOf("row-a"), held, (id) => said.push(id))
  expect(held.current).toBe("row-a")
  expect(said).toEqual(["row-a"])
})

test("the id a drag names is read off the event as text", () => {
  const held: Held = { current: null }
  tookHold(eventOf(7), held, () => undefined)
  expect(held.current).toBe("7")
})

test("a drag ending clears the ref, the state and the drop target together", () => {
  const held: Held = { current: "row-a" }
  const said: (string | null)[] = []
  const target: null[] = []
  letGo(
    held,
    (id) => said.push(id),
    (at) => target.push(at)
  )
  expect(held.current).toBeNull()
  expect(said).toEqual([null])
  expect(target).toEqual([null])
})
