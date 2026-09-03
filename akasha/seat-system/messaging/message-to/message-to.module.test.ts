import { describe, expect, test } from "bun:test"
import {
  decideRecipient,
  matching,
  names,
  readStated,
  type SeatRow,
  type Stated,
} from "./message-to.module.code.ts"

function seat(id: string, domain: string, role: string, activeAtMs: number): SeatRow {
  return { id, name: id, domain, role, activeAtMs }
}

const ADDRESSED: Stated = { kind: "domain", domain: "akasha-migration", role: "worker" }

describe("readStated", () => {
  test("reads a domain and a role together as an address", () => {
    expect(readStated("akasha-migration", "worker")).toEqual(ADDRESSED)
  })

  test("reads neither as nothing stated", () => {
    expect(readStated(undefined, undefined)).toEqual({ kind: "none" })
    expect(readStated("  ", " ")).toEqual({ kind: "none" })
  })

  test("refuses a domain standing without a role", () => {
    const stated = readStated("akasha-migration", undefined)
    expect(stated.kind).toBe("refuse")
    expect(stated.kind === "refuse" && stated.reason).toContain("Add --role")
  })

  test("refuses a role standing without a domain", () => {
    const stated = readStated(undefined, "worker")
    expect(stated.kind).toBe("refuse")
    expect(stated.kind === "refuse" && stated.reason).toContain("stands alone")
  })

  test("trims what it is handed", () => {
    expect(readStated(" akasha-migration ", " worker ")).toEqual(ADDRESSED)
  })
})

describe("matching", () => {
  const seats = [
    seat("a", "akasha-migration", "worker", 1),
    seat("b", "akasha-migration", "lead", 2),
    seat("c", "other", "worker", 3),
  ]

  test("takes only the seats stating both", () => {
    expect(matching(ADDRESSED, seats).map((s) => s.id)).toEqual(["a"])
  })

  test("matches nothing where nothing is stated", () => {
    expect(matching({ kind: "none" }, seats)).toEqual([])
  })
})

describe("decideRecipient", () => {
  test("takes the most recently active of several", () => {
    const seats = [
      seat("old", "akasha-migration", "worker", 1),
      seat("new", "akasha-migration", "worker", 9),
    ]
    const found = decideRecipient(ADDRESSED, seats)
    expect(found.kind === "seat" && found.seat.id).toBe("new")
  })

  test("finds nobody where no seat states the address", () => {
    expect(decideRecipient(ADDRESSED, [])).toEqual({ kind: "none" })
  })
})

describe("names", () => {
  test("says the domain and the role", () => {
    expect(names(ADDRESSED)).toBe("domain 'akasha-migration' and role 'worker'")
  })

  test("says nothing where nothing is stated", () => {
    expect(names({ kind: "none" })).toBe("nothing")
  })
})
