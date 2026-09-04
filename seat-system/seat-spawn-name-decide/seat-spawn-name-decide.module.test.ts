import { expect, test } from "bun:test"
import {
  compositionOf,
  decideSpawnName,
  type SeatNameComposition,
} from "./seat-spawn-name-decide.module.code.ts"

test("a name that was spelled is a composition", () => {
  expect(compositionOf({ spelled: "akasha-worker", role: "worker", roleIsDefault: false })).toEqual(
    {
      kind: "composed",
      name: "akasha-worker",
    }
  )
})

test("a seat that spelled nothing composed nothing", () => {
  expect(compositionOf({ spelled: null, role: "worker", roleIsDefault: true })).toEqual({
    kind: "none",
  })
})

test("a seat spelling only the role it defaults to has stated nothing", () => {
  expect(compositionOf({ spelled: "worker", role: "worker", roleIsDefault: true })).toEqual({
    kind: "none",
  })
})

test("a seat spelling a role it did not default to has stated something", () => {
  expect(compositionOf({ spelled: "worker", role: "worker", roleIsDefault: false })).toEqual({
    kind: "composed",
    name: "worker",
  })
})

test("a composition carries through as the name to mint under", () => {
  const said = decideSpawnName({ composed: { kind: "composed", name: "akasha-worker" } })
  expect(said).toEqual({ kind: "composed", name: "akasha-worker" })
})

test("a composition that failed refuses the start and carries its reason", () => {
  const composed: SeatNameComposition = { kind: "failed", reason: "the pages could not be read" }
  const said = decideSpawnName({ composed })
  expect(said.kind).toBe("reject")
  if (said.kind === "reject") {
    expect(said.reason).toContain("the pages could not be read")
    expect(said.reason).toContain("FAILED")
  }
})

test("a seat that stated nothing is refused, and told what to state", () => {
  const said = decideSpawnName({ composed: { kind: "none" } })
  expect(said.kind).toBe("reject")
  if (said.kind === "reject") {
    expect(said.reason).toContain("--domain")
    expect(said.reason).toContain("--persona")
  }
})

test("a failure and a seat that stated nothing are refused for different reasons", () => {
  const failed = decideSpawnName({ composed: { kind: "failed", reason: "broke" } })
  const none = decideSpawnName({ composed: { kind: "none" } })
  expect(failed.kind === "reject" && none.kind === "reject" && failed.reason === none.reason).toBe(
    false
  )
})
