import { expect, test } from "bun:test"
import {
  decideProxyLiveness,
  INITIAL_PROXY_LIVENESS_STATE,
  type ProxyLivenessState,
} from "./supervisor-proxy-liveness-decide.module.code.ts"

function failing(state: ProxyLivenessState, times: number): ProxyLivenessState {
  let held = state
  for (let at = 0; at < times; at += 1) held = decideProxyLiveness(held, false).state
  return held
}

test("two failures in a row are counted and nothing is done", () => {
  const first = decideProxyLiveness(INITIAL_PROXY_LIVENESS_STATE, false)
  expect(first.action).toBe("none")
  expect(first.state.consecutiveFailures).toBe(1)
  expect(decideProxyLiveness(first.state, false).action).toBe("none")
})

test("the third failure in a row respawns the proxy", () => {
  const held = failing(INITIAL_PROXY_LIVENESS_STATE, 2)
  const said = decideProxyLiveness(held, false)
  expect(said.action).toBe("respawn")
  expect(said.state.consecutiveFailures).toBe(0)
  expect(said.state.consecutiveRespawns).toBe(1)
})

test("one healthy check clears every failure and respawn counted", () => {
  const held = failing(INITIAL_PROXY_LIVENESS_STATE, 5)
  expect(decideProxyLiveness(held, true).state).toEqual(INITIAL_PROXY_LIVENESS_STATE)
})

test("a fourth respawn is where the supervisor gives up instead", () => {
  const held = failing(INITIAL_PROXY_LIVENESS_STATE, 12)
  expect(held.gaveUp).toBe(true)
  expect(held.consecutiveRespawns).toBe(3)
})

test("a supervisor that gave up counts no further failure", () => {
  const gone = failing(INITIAL_PROXY_LIVENESS_STATE, 12)
  const said = decideProxyLiveness(gone, false)
  expect(said.action).toBe("none")
  expect(said.state).toEqual(gone)
})
