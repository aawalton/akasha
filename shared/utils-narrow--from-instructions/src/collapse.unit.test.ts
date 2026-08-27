import { describe, expect, test } from "bun:test"
import { CollapseRefused, collapse, folds, refuses, seal } from "./collapse"

type Reading = "yes" | "no" | "cannot-tell"

describe("collapse", () => {
  test("a bare token takes its own entry's value", () => {
    const table = {
      yes: folds(1, "a positive reading counts"),
      no: folds(0, "a negative reading does not"),
      "cannot-tell": folds(0, "an unreadable one is not a positive"),
    }
    expect(collapse<Reading, number>("yes", table)).toBe(1)
    expect(collapse<Reading, number>("cannot-tell", table)).toBe(0)
  })

  test("a sealed reading takes its own entry's value", () => {
    const sealed = seal<Reading>("no", undefined)
    expect(
      collapse(sealed, {
        yes: folds(true, "positive"),
        no: folds(false, "negative"),
        "cannot-tell": folds(false, "unreadable is not positive"),
      })
    ).toBe(false)
  })

  test("refuses rethrows the sealed cause ITSELF, so a caller that declines to guess loses nothing", () => {
    const cause = new Error("EIO reading /proc")
    const sealed = seal<Reading>("cannot-tell", cause)
    let thrown: unknown
    try {
      collapse(sealed, {
        yes: folds(true, "positive"),
        no: folds(false, "negative"),
        "cannot-tell": refuses("an unreadable answer is a fault, not a reading"),
      })
    } catch (err) {
      thrown = err
    }
    expect(thrown).toBe(cause)
  })

  test("refuses with no cause to rethrow throws a CollapseRefused naming the reading and the reason", () => {
    let thrown: unknown
    try {
      collapse<Reading, boolean>("cannot-tell", {
        yes: folds(true, "positive"),
        no: folds(false, "negative"),
        "cannot-tell": refuses("this caller has no correct guess available"),
      })
    } catch (err) {
      thrown = err
    }
    if (!(thrown instanceof CollapseRefused))
      throw new Error(`expected a CollapseRefused, got ${String(thrown)}`)
    expect(thrown.message).toContain("cannot-tell")
    expect(thrown.message).toContain("no correct guess available")
  })

  test("a sealed refusal whose cause is undefined still names the reading rather than throwing undefined", () => {
    const sealed = seal<Reading>("cannot-tell", undefined)
    expect(() =>
      collapse(sealed, {
        yes: folds(true, "positive"),
        no: folds(false, "negative"),
        "cannot-tell": refuses("no cause rode along"),
      })
    ).toThrow(CollapseRefused)
  })

  test("the reason rides on the choice, so it is data a reader can retrieve", () => {
    const choice = folds(false, "a lock nobody can read stays with its incumbent")
    expect(choice.because).toBe("a lock nobody can read stays with its incumbent")
    expect(refuses("no correct guess").because).toBe("no correct guess")
  })
})

describe("what does not compile", () => {
  test("a sealed reading has NO readable member — the table is the only exit", () => {
    const sealed = seal<Reading>("yes", undefined)
    // @ts-expect-error — there is deliberately no `reading` to compare against. A
    const _unreadable = sealed.reading
    // @ts-expect-error — nor any other name for it.
    const _alsoUnreadable = sealed.value
    expect(typeof sealed.fold).toBe("function")
  })

  test("a bare outcome is not a Choice — the justification is not optional", () => {
    collapse<Reading, boolean>("yes", {
      yes: folds(true, "declared"),
      no: folds(false, "declared"),
      // @ts-expect-error — an outcome with no reason is the undeclared collapse
      "cannot-tell": false,
    })
    // @ts-expect-error — and `folds` will not take an outcome without one either.
    folds(true)
  })

  test("a missing reading does not compile, so a fifth reading breaks every site consciously", () => {
    const partial = { yes: folds(true, "declared"), no: folds(false, "declared") }
    // @ts-expect-error — `cannot-tell` is absent, so the table is not total. This is
    collapse<Reading, boolean>("yes", partial)
    expect(true).toBe(true)
  })
})
