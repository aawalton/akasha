import { expect, test } from "bun:test"
import {
  decideMintAction,
  decideRecoveryAction,
  domainSaid,
  RECOVERY_SPAN,
  recoveryMarkRead,
  routeRead,
} from "./device-secret-minting.module.code.ts"

const A_MOMENT = 1756700000000

test("a device holding its secret where the widget extension reads it mints none", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "pinned" })).toBe("skip")
})

test("a device holding its secret where only the app reads it mints one", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "default" })).toBe("mint")
})

test("a device that did not say which domain holds its secret mints one", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "unsaid" })).toBe("mint")
})

test("a device holding no secret mints one", () => {
  expect(decideMintAction({ ok: true, present: false, domain: "pinned" })).toBe("mint")
})

test("a device that could not be asked mints one, so a lost answer never leaves it without", () => {
  expect(decideMintAction({ ok: false })).toBe("mint")
})

test("the two domains a shell names are read and anything else is unsaid", () => {
  expect(domainSaid("pinned")).toBe("pinned")
  expect(domainSaid("default")).toBe("default")
  expect(domainSaid(undefined)).toBe("unsaid")
  expect(domainSaid("fallback")).toBe("unsaid")
})

test("a route taking the secret is read as admitted", () => {
  expect(routeRead({ held: true, status: 200 })).toBe("admitted")
})

test("a route refusing the secret is read as refused", () => {
  expect(routeRead({ held: true, status: 401 })).toBe("refused")
})

test("a route saying it could not answer is read as no answer", () => {
  expect(routeRead({ held: true, status: 503 })).toBe("unanswered")
  expect(routeRead({ held: true, status: 500 })).toBe("unanswered")
})

test("a route that was never reached is read as no answer", () => {
  expect(routeRead({ held: true, status: 0 })).toBe("unanswered")
})

test("a device presenting nothing is read as refused, because nothing is what a route refuses", () => {
  expect(routeRead({ held: false, status: 0 })).toBe("refused")
})

test("a device the route refuses and that recovered never before recovers", () => {
  expect(decideRecoveryAction({ route: "refused", recoveredAt: null, now: A_MOMENT })).toBe(
    "recover"
  )
})

test("a device the route admits keeps what it holds", () => {
  expect(decideRecoveryAction({ route: "admitted", recoveredAt: null, now: A_MOMENT })).toBe("hold")
})

test("a device with no answer from the route keeps what it holds", () => {
  expect(decideRecoveryAction({ route: "unanswered", recoveredAt: null, now: A_MOMENT })).toBe(
    "hold"
  )
})

test("a device that recovered within the day recovers no second time", () => {
  expect(decideRecoveryAction({ route: "refused", recoveredAt: A_MOMENT - 1, now: A_MOMENT })).toBe(
    "hold"
  )
  expect(
    decideRecoveryAction({
      route: "refused",
      recoveredAt: A_MOMENT - RECOVERY_SPAN + 1,
      now: A_MOMENT,
    })
  ).toBe("hold")
})

test("a device that recovered a day ago recovers again", () => {
  expect(
    decideRecoveryAction({ route: "refused", recoveredAt: A_MOMENT - RECOVERY_SPAN, now: A_MOMENT })
  ).toBe("recover")
})

test("a mark written later than now is read as no mark, so a moved clock never holds a device", () => {
  expect(decideRecoveryAction({ route: "refused", recoveredAt: A_MOMENT + 1, now: A_MOMENT })).toBe(
    "recover"
  )
})

test("a mark is read as the moment it names", () => {
  expect(recoveryMarkRead(String(A_MOMENT))).toBe(A_MOMENT)
  expect(recoveryMarkRead("0")).toBe(0)
})

test("a mark naming no moment is read as no mark", () => {
  expect(recoveryMarkRead(null)).toBeNull()
  expect(recoveryMarkRead(undefined)).toBeNull()
  expect(recoveryMarkRead("")).toBeNull()
  expect(recoveryMarkRead("yesterday")).toBeNull()
  expect(recoveryMarkRead("-1")).toBeNull()
  expect(recoveryMarkRead("1.5")).toBeNull()
})
