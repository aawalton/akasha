import { expect, test } from "bun:test"
import { capacitorCorsHeaders } from "./capacitor-cors.module.code.ts"

const SHELL = "https://alanwalton.com"

const OLD_SHELL = "capacitor://localhost"

const METHODS = "POST, OPTIONS"

function asked(origin: string | null): { headers: { get: (name: string) => string | null } } {
  return { headers: { get: (name) => (name.toLowerCase() === "origin" ? origin : null) } }
}

test("the shell's https origin is named back to the shell", () => {
  expect(capacitorCorsHeaders(asked(SHELL), METHODS)["Access-Control-Allow-Origin"]).toBe(SHELL)
})

test("the custom scheme an installed build still sends is named back to that build", () => {
  expect(capacitorCorsHeaders(asked(OLD_SHELL), METHODS)["Access-Control-Allow-Origin"]).toBe(
    OLD_SHELL
  )
})

test("a request from another origin is answered without a cross-origin header", () => {
  expect(capacitorCorsHeaders(asked("https://example.invalid"), METHODS)).toEqual({})
})

test("a request carrying no origin is answered without a cross-origin header", () => {
  expect(capacitorCorsHeaders(asked(null), METHODS)).toEqual({})
})
