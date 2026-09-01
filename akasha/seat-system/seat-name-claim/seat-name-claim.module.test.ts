import { expect, test } from "bun:test"
import {
  type Ancestry,
  addressableByName,
  ancestorOfSelf,
  type Claiming,
  claimed,
  nameShaped,
} from "./seat-name-claim.module.code.ts"

function asking(over: Partial<Claiming> = {}): Claiming {
  return {
    claimingAgentId: "01a05e00-0000-7000-8000-000000000001",
    name: "athena",
    addressable: true,
    holder: null,
    holderIsCallerSeat: false,
    takeLiveName: false,
    ...over,
  }
}

test("a name nothing holds is taken", () => {
  expect(claimed(asking())).toEqual({ allow: true })
})

test("a name reading as an id is refused as unreachable", () => {
  const said = claimed(asking({ addressable: false, name: "abcdef1" }))
  expect(said.allow).toBe(false)
  if (said.allow) throw new Error("refused")
  expect(said.cause).toBe("unaddressable")
  expect(said.said).toContain("outside a-f")
})

test("the seat already holding the name takes it again", () => {
  const held = { agentId: "01a05e00-0000-7000-8000-000000000001", presence: "present" as const }
  expect(claimed(asking({ holder: held }))).toEqual({ allow: true })
})

test("a name held by a live seat is refused, and the refusal says how to take it", () => {
  const held = { agentId: "01a05e00-0000-7000-8000-0000000000ff", presence: "present" as const }
  const said = claimed(asking({ holder: held }))
  if (said.allow) throw new Error("refused")
  expect(said.cause).toBe("live-holder")
  expect(said.said).toContain("akasha seat supervisor stop athena")
  expect(said.said).toContain("--take-live-name")
})

test("a live holder is taken from where the caller says to", () => {
  const held = { agentId: "01a05e00-0000-7000-8000-0000000000ff", presence: "present" as const }
  expect(claimed(asking({ holder: held, takeLiveName: true }))).toEqual({ allow: true })
})

test("a name whose holder has no process in it is taken", () => {
  const held = { agentId: "01a05e00-0000-7000-8000-0000000000ff", presence: "absent" as const }
  expect(claimed(asking({ holder: held }))).toEqual({ allow: true })
})

test("a caller whose own seat holds the name takes it back without saying so", () => {
  const held = { agentId: "01a05e00-0000-7000-8000-0000000000ff", presence: "present" as const }
  expect(claimed(asking({ holder: held, holderIsCallerSeat: true }))).toEqual({
    allow: true,
  })
})

test("a name is shaped when it is lower kebab and long enough", () => {
  expect(nameShaped("athena")).toBe(true)
  expect(nameShaped("athena-worker-1")).toBe(true)
  expect(nameShaped("a")).toBe(false)
  expect(nameShaped("Athena")).toBe(false)
  expect(nameShaped("-athena")).toBe(false)
  expect(nameShaped("athena-")).toBe(false)
})

test("a long name of hex alone is no name", () => {
  expect(nameShaped("abcdefabc")).toBe(false)
  expect(nameShaped("abcdef")).toBe(true)
})

test("a uuid and a hex prefix are not reachable by name", () => {
  expect(addressableByName("01a05e00-0000-7000-8000-000000000001")).toBe(false)
  expect(addressableByName("01a05e00")).toBe(false)
  expect(addressableByName("abcdef")).toBe(false)
  expect(addressableByName("athena")).toBe(true)
})

test("a process is its own ancestor and an unrelated one is not", () => {
  const line: Readonly<Record<number, number | null>> = { 500: 400, 400: 300, 300: 1 }
  const how: Ancestry = { parentOf: (pid) => line[pid] ?? null, self: () => 500 }
  expect(ancestorOfSelf(500, how)).toBe(true)
  expect(ancestorOfSelf(300, how)).toBe(true)
  expect(ancestorOfSelf(999, how)).toBe(false)
})

test("an ancestry that never reaches the top does not run on for ever", () => {
  const how: Ancestry = { parentOf: (pid) => pid + 1, self: () => 1000 }
  expect(ancestorOfSelf(-1, how)).toBe(false)
})
