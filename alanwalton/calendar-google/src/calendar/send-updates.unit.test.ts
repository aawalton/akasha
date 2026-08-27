import { describe, expect, test } from "bun:test"
import { InputError } from "@shared/errors-core/exit"
import { narrowSendUpdates, SEND_UPDATES } from "./send-updates"

describe("narrowSendUpdates", () => {
  test("returns undefined when the flag is absent", () => {
    expect(narrowSendUpdates(undefined)).toBeUndefined()
  })

  test("narrows each valid choice to itself", () => {
    for (const choice of SEND_UPDATES) {
      expect(narrowSendUpdates(choice)).toBe(choice)
    }
  })

  test("throws InputError on an unrecognized value", () => {
    expect(() => narrowSendUpdates("everyone")).toThrow(InputError)
  })
})
