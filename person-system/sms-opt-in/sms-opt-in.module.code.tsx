import { Button } from "@akasha/design-primitives/button"
import { Checkbox } from "@akasha/design-primitives/checkbox"
import { Heading } from "@akasha/design-primitives/heading"
import { Input } from "@akasha/design-primitives/input"
import { Label } from "@akasha/design-primitives/label"
import { type FormEvent, useState } from "react"
import { z } from "zod"
import { CONSENT_TEXT } from "../sms-consent/sms-consent.module.code.ts"

const ResponseSchema = z.object({ ok: z.boolean().optional(), error: z.string().optional() })

type Status = "idle" | "submitting" | "success" | "error"

export function SmsOptInForm() {
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
      setError("Please enter your full name.")
      return
    }
    if (phone.length === 0) {
      setError("Please enter your mobile phone number.")
      return
    }
    if (!consent) {
      setError("Please check the box to agree to receive messages.")
      return
    }

    setStatus("submitting")
    try {
      const response = await fetch("/api/sms/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, consent: true, website }),
      })
      const parsed = ResponseSchema.safeParse(await response.json().catch(() => null))
      const body = parsed.success ? parsed.data : {}
      if (response.ok && body.ok === true) {
        setStatus("success")
        return
      }
      setStatus("error")
      setError(body.error ?? "Something went wrong. Please try again.")
    } catch {
      setStatus("error")
      setError("Network error. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-2" role="status">
        <Heading variant="subsection-accent">Thank you &mdash; your consent is recorded.</Heading>
        <p className="text-secondary text-sm">
          You&rsquo;ve opted in to receive SMS text messages from Amy. Reply <strong>STOP</strong>{" "}
          at any time to opt out, or <strong>HELP</strong> for help.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="opt-in-name">Full name</Label>
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
        <Label htmlFor="opt-in-phone">Mobile phone number</Label>
        <Input
          id="opt-in-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="(555) 123-4567"
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
          className="font-normal text-secondary text-sm leading-relaxed"
        >
          {CONSENT_TEXT} See our{" "}
          <a className="text-accent underline" href="/terms">
            Terms
          </a>{" "}
          and the{" "}
          <a className="text-accent underline" href="#privacy">
            Privacy
          </a>{" "}
          section below.
        </Label>
      </div>

      {error !== null && (
        <p className="text-red text-sm" role="alert">
          &#9888; {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Opt in to messages"}
      </Button>
    </form>
  )
}
