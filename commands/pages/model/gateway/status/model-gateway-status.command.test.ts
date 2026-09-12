import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  driftOf,
  modelGatewayStatus,
  shortOf,
} from "akasha/commands/pages/model/gateway/status/model-gateway-status.command.code.ts"

const CALLED_AS = "akasha model gateway status"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a word naming a seat is refused", () => {
  const said = modelGatewayStatus(["awen"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    `\`awen\` is no argument \`${CALLED_AS}\` takes — it takes \`--json\``
  )
})

test("a flag a status does not take is refused by name", () => {
  const said = modelGatewayStatus(["--fleet"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--fleet")
})

test("a seat holding the version the tree holds is current", () => {
  expect(driftOf("abc", "abc")).toBe("current")
})

test("a seat holding another version than the tree is lagging", () => {
  expect(driftOf("abc", "def")).toBe("lagging")
})

test("a version either side does not answer is unknown", () => {
  expect(driftOf(null, "def")).toBe("unknown")
  expect(driftOf("abc", null)).toBe("unknown")
})

test("a version is shortened, and a version that will not read is shown as a dash", () => {
  expect(shortOf("0123456789abcdef")).toBe("0123456789ab")
  expect(shortOf(null)).toBe("—")
  expect(shortOf("")).toBe("—")
})
