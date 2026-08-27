import { describe, expect, test } from "bun:test"
import { handlerSeatName, isHandlerSeatName } from "./person-document"

describe("handlerSeatName", () => {
  test("spells the persona, then the person, then the role", () => {
    expect(handlerSeatName("amy", "alan")).toBe("amy-alan-handler")
  })

  test("takes the persona from the person served, which is not always amy", () => {
    expect(handlerSeatName("amy", "ki")).toBe("amy-ki-handler")
    expect(handlerSeatName("claude", "jenny")).toBe("claude-jenny-handler")
  })

  test("composes a name for a person no code anywhere mentions", () => {
    expect(handlerSeatName("amy", "david")).toBe("amy-david-handler")
    expect(handlerSeatName("claude", "katara")).toBe("claude-katara-handler")
  })
})

describe("isHandlerSeatName", () => {
  const PERSONS = ["alan", "david", "jenny", "joseph", "katara", "ki", "lizzy"]
  const PERSONAS = ["amy", "claude", "athena", "sophia", "aine"]

  test("accepts every name the composition produces", () => {
    for (const persona of PERSONAS) {
      for (const person of PERSONS) {
        expect(isHandlerSeatName(handlerSeatName(persona, person))).toBe(true)
      }
    }
  })

  test("rejects the persona handles ordinary page-chat sends", () => {
    for (const persona of PERSONAS) {
      expect(isHandlerSeatName(persona)).toBe(false)
    }
    expect(isHandlerSeatName("amy-lead")).toBe(false)
    expect(isHandlerSeatName("amy-person-lead")).toBe(false)
  })

  test("rejects a two-segment name that merely ends in the role", () => {
    expect(isHandlerSeatName("error-handler")).toBe(false)
    expect(isHandlerSeatName("handler")).toBe(false)
  })

  test("rejects a name whose role component is something else", () => {
    expect(isHandlerSeatName("amy-person-manager")).toBe(false)
    expect(isHandlerSeatName("amy-alan-handler-extra")).toBe(false)
  })

  test("rejects a name with an empty segment", () => {
    expect(isHandlerSeatName("--handler")).toBe(false)
    expect(isHandlerSeatName("amy--handler")).toBe(false)
  })
})
