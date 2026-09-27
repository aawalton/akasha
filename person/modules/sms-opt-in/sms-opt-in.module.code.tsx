import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Checkbox } from "akasha/design/interface/primitive/modules/checkbox/checkbox.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { formNetworkError } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/form-network-error.web-phrase.ts"
import { formSomethingWrong } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/form-something-wrong.web-phrase.ts"
import { smsOptInAndOur } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-and-our.web-phrase.ts"
import { smsOptInConsentMissing } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-consent-missing.web-phrase.ts"
import { smsOptInNameLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-name-label.web-phrase.ts"
import { smsOptInNameMissing } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-name-missing.web-phrase.ts"
import { smsOptInPhoneLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-phone-label.web-phrase.ts"
import { smsOptInPhoneMissing } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-phone-missing.web-phrase.ts"
import { smsOptInPhonePlaceholder } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-phone-placeholder.web-phrase.ts"
import { smsOptInSeeOur } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-see-our.web-phrase.ts"
import { smsOptInSubmit } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-submit.web-phrase.ts"
import { smsOptInSubmitting } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-submitting.web-phrase.ts"
import { smsOptInThanks } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/sms-opt-in-thanks.web-phrase.ts"
import type { ConsentWording } from "akasha/person/modules/sms-consent/sms-consent.module.code.ts"
import { type FormEvent, useState } from "react"
import { z } from "zod"

const ResponseSchema = z.object({ ok: z.boolean().optional(), error: z.string().optional() })

type Status = "idle" | "submitting" | "success" | "error"

type Policy = { readonly title: string; readonly href: string }

export function SmsOptInForm({
  wording,
  afterward,
  terms,
  privacy,
}: {
  wording: ConsentWording
  afterward: string | null
  terms: Policy
  privacy: Policy
}) {
  const phrase = usePhrase()
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const website = String(data.get("website") ?? "")

    if (name.length === 0) {
      setError(phrase(smsOptInNameMissing.slug))
      return
    }
    if (phone.length === 0) {
      setError(phrase(smsOptInPhoneMissing.slug))
      return
    }
    if (!consent) {
      setError(phrase(smsOptInConsentMissing.slug))
      return
    }

    setStatus("submitting")
    try {
      const response = await fetch("/api/sms/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          consent: true,
          consentTextVersion: wording.version,
          website,
        }),
      })
      const parsed = ResponseSchema.safeParse(await response.json().catch(() => null))
      const body = parsed.success ? parsed.data : {}
      if (response.ok && body.ok === true) {
        setStatus("success")
        return
      }
      setStatus("error")
      setError(body.error ?? phrase(formSomethingWrong.slug))
    } catch {
      setStatus("error")
      setError(phrase(formNetworkError.slug))
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-2" role="status">
        <Heading variant="subsection-accent">{phrase(smsOptInThanks.slug)}</Heading>
        {afterward === null ? null : <p className="text-secondary text-sm">{afterward}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="opt-in-name">{phrase(smsOptInNameLabel.slug)}</Label>
        <Input
          id="opt-in-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={200}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="opt-in-phone">{phrase(smsOptInPhoneLabel.slug)}</Label>
        <Input
          id="opt-in-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder={phrase(smsOptInPhonePlaceholder.slug)}
        />
      </div>

      <div aria-hidden="true" className="hidden">
        <label htmlFor="opt-in-website">Website</label>
        <input id="opt-in-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="opt-in-consent"
          checked={consent}
          onCheckedChange={(value) => setConsent(value === true)}
        />
        <Label
          htmlFor="opt-in-consent"
          className="block font-normal text-secondary text-sm leading-relaxed"
        >
          {wording.wording} {phrase(smsOptInSeeOur.slug)}{" "}
          <a className="text-accent underline" href={terms.href}>
            {terms.title}
          </a>{" "}
          {phrase(smsOptInAndOur.slug)}{" "}
          <a className="text-accent underline" href={privacy.href}>
            {privacy.title}
          </a>
          .
        </Label>
      </div>

      {error !== null && (
        <p className="text-red text-sm" role="alert">
          &#9888; {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {phrase(status === "submitting" ? smsOptInSubmitting.slug : smsOptInSubmit.slug)}
      </Button>
    </form>
  )
}
