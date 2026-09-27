import { expect, test } from "bun:test"
import { SmsOptInForm } from "akasha/person/modules/sms-opt-in/sms-opt-in.module.code.tsx"
import { JSDOM } from "jsdom"
import { renderToStaticMarkup } from "react-dom/server"

const WORDING = { wording: "I agree to the wording.", version: "2026-01-01" }

const SHOWN = `${WORDING.wording} See our Terms and our Privacy Policy.`

test("the form is written as a tag, and the tag names the component itself", () => {
  const written = <SmsOptInForm wording={WORDING} afterward={null} />
  expect(written.type).toBe(SmsOptInForm)
})

test("the label beside the box reads the whole wording the form is handed", () => {
  const { window } = new JSDOM(
    renderToStaticMarkup(<SmsOptInForm wording={WORDING} afterward={null} />)
  )
  const label = window.document.querySelector('label[for="opt-in-consent"]')
  expect(label?.textContent).toBe(SHOWN)
})
