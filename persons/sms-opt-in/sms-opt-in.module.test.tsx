import { expect, test } from "bun:test"
import { CONSENT_TEXT_SHOWN } from "akasha/persons/sms-consent/sms-consent.module.code.ts"
import { SmsOptInForm } from "akasha/persons/sms-opt-in/sms-opt-in.module.code.tsx"
import { JSDOM } from "jsdom"
import { renderToStaticMarkup } from "react-dom/server"

test("the form is written as a tag, and the tag names the component itself", () => {
  const written = <SmsOptInForm />
  expect(written.type).toBe(SmsOptInForm)
})

test("the form takes nothing, so nothing outside it decides what a person agrees to", () => {
  expect(SmsOptInForm.length).toBe(0)
})

test("the label beside the box reads the whole wording the consent module states", () => {
  const { window } = new JSDOM(renderToStaticMarkup(<SmsOptInForm />))
  const label = window.document.querySelector('label[for="opt-in-consent"]')
  expect(label?.textContent).toBe(CONSENT_TEXT_SHOWN)
})
