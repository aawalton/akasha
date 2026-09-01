import { expect, test } from "bun:test"
import {
  composeSeatName,
  flexInName,
  handlerSeatName,
  type NameableSeat,
  SEAT_NAMING,
  type SeatNaming,
} from "./seat-naming.module.code.ts"

const NAMING: SeatNaming = { defaultPersona: "claude", namedByPersona: ["alan"] }

function nameable(
  held: { readonly persona?: string; readonly domain?: string; readonly role?: string },
  flex: string | null,
  principal: string | null
): NameableSeat {
  return {
    attributes: {
      persona: held.persona ?? null,
      domain: held.domain ?? null,
      role: held.role ?? null,
    },
    flex,
    principal,
  }
}

test("a name is the domain and the role and the flex joined in that order", () => {
  const spelled = composeSeatName(
    nameable({ domain: "akasha-system", role: "worker" }, "flex-2", "agent"),
    NAMING
  )
  expect(spelled).toBe("akasha-system-worker-flex-2")
})

test("a slot stated as nothing is left out of the name", () => {
  expect(composeSeatName(nameable({ role: "worker" }, null, null), NAMING)).toBe("worker")
  expect(composeSeatName(nameable({ domain: "akasha-system", role: "" }, "", null), NAMING)).toBe(
    "akasha-system"
  )
})

test("a seat whose role is the handler role is named for its domain alone", () => {
  const spelled = composeSeatName(
    nameable({ persona: "athena", domain: "alan", role: "handler" }, "flex-1", "alan"),
    NAMING
  )
  expect(spelled).toBe("alan")
})

test("a persona names a seat outright where its principal is one named by persona", () => {
  const spelled = composeSeatName(
    nameable({ persona: "athena", domain: "akasha-system", role: "worker" }, null, "alan"),
    NAMING
  )
  expect(spelled).toBe("athena")
})

test("the persona a seat begins with names no seat outright", () => {
  const spelled = composeSeatName(
    nameable({ persona: "claude", domain: "akasha-system", role: "worker" }, null, "alan"),
    NAMING
  )
  expect(spelled).toBe("akasha-system-worker")
})

test("a persona names no seat whose principal is not one named by persona", () => {
  const spelled = composeSeatName(
    nameable({ persona: "athena", domain: "akasha-system", role: "worker" }, null, "agent"),
    NAMING
  )
  expect(spelled).toBe("akasha-system-worker")
})

test("a flex that is no flex value leaves the seat unnamed", () => {
  const held = { domain: "akasha-system", role: "worker" }
  expect(composeSeatName(nameable(held, "flex-01", "agent"), NAMING)).toBeNull()
  expect(composeSeatName(nameable(held, "flex", "agent"), NAMING)).toBeNull()
  expect(composeSeatName(nameable(held, "flex-2x", "agent"), NAMING)).toBeNull()
})

test("a seat stating nothing at all has no name", () => {
  expect(composeSeatName(nameable({}, null, null), NAMING)).toBeNull()
})

test("a flex is found in the name that carries it", () => {
  expect(flexInName("akasha-system-worker-flex-2")).toBe("flex-2")
  expect(flexInName("flex-0-worker")).toBe("flex-0")
  expect(flexInName("akasha-system-flex-11-worker")).toBe("flex-11")
})

test("a name carrying no flex answers with none", () => {
  expect(flexInName("akasha-system-worker")).toBeNull()
  expect(flexInName("reflex-2")).toBeNull()
})

test("a handler seat is named for the person it answers", () => {
  expect(handlerSeatName("alan")).toBe("alan")
})

test("a handler seat for nobody cannot be named", () => {
  expect(() => handlerSeatName("")).toThrow()
})

test("the persona a seat begins with is read from the seat's page type", () => {
  expect(SEAT_NAMING).toEqual({ defaultPersona: "claude", namedByPersona: ["alan"] })
})
