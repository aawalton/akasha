import { expect, test } from "bun:test"
import { PhrasesSeeded } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { smsOptInAndOur } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-and-our.web-phrase.ts"
import { smsOptInSeeOur } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-see-our.web-phrase.ts"
import { SmsOptInForm } from "akasha/person/modules/sms-opt-in/sms-opt-in.module.code.tsx"
import { JSDOM } from "jsdom"
import { renderToStaticMarkup } from "react-dom/server"

const WORDING = { wording: "I agree to the wording.", version: "2026-01-01" }

const TERMS = { title: "The Terms", href: "/terms" }

const PRIVACY = { title: "The Privacy", href: "/privacy" }

const SEED = [smsOptInSeeOur, smsOptInAndOur]

const SHOWN = `${WORDING.wording} ${smsOptInSeeOur.title} ${TERMS.title} ${smsOptInAndOur.title} ${PRIVACY.title}.`

test("the form is written as a tag, and the tag names the component itself", () => {
  const written = (
    <SmsOptInForm wording={WORDING} afterward={null} terms={TERMS} privacy={PRIVACY} />
  )
  expect(written.type).toBe(SmsOptInForm)
})

test("the label beside the box reads the wording, the phrases and the documents' titles", () => {
  const { window } = new JSDOM(
    renderToStaticMarkup(
      <PhrasesSeeded phrases={SEED}>
        <SmsOptInForm wording={WORDING} afterward={null} terms={TERMS} privacy={PRIVACY} />
      </PhrasesSeeded>
    )
  )
  const label = window.document.querySelector('label[for="opt-in-consent"]')
  expect(label?.textContent).toBe(SHOWN)
})
