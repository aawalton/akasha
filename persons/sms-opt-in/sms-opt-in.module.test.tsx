import { expect, test } from "bun:test"
import { SmsOptInForm } from "./sms-opt-in.module.code.tsx"

test("the form is written as a tag, and the tag names the component itself", () => {
  const written = <SmsOptInForm />
  expect(written.type).toBe(SmsOptInForm)
})

test("the form takes nothing, so nothing outside it decides what a person agrees to", () => {
  expect(SmsOptInForm.length).toBe(0)
})
