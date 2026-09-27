import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { Separator } from "akasha/design/interface/primitive/modules/separator/separator.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { DrawnSection } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { useSeededPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { formNetworkError } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/form-network-error.web-phrase.ts"
import { formSomethingWrong } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/form-something-wrong.web-phrase.ts"
import { subscribeButton } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-button.web-phrase.ts"
import { subscribeEmailLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-email-label.web-phrase.ts"
import { subscribeFormLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-form-label.web-phrase.ts"
import { subscribeInvalidEmail } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-invalid-email.web-phrase.ts"
import { subscribePlaceholder } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-placeholder.web-phrase.ts"
import { subscribeSubscribing } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-subscribing.web-phrase.ts"
import { subscribeThanks } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/subscribe-thanks.web-phrase.ts"
import { useId, useState } from "react"
import { z } from "zod"

const ErrorBodySchema = z.object({ error: z.string() }).partial()

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }

export function SubscribeForm({ section }: { section: DrawnSection }) {
  const inputId = useId()
  const phrase = useSeededPhrase()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (status.kind === "submitting" || status.kind === "success") return

    const trimmed = email.trim()
    if (trimmed === "" || !trimmed.includes("@")) {
      setStatus({ kind: "error", message: phrase(subscribeInvalidEmail.slug) })
      return
    }

    setStatus({ kind: "submitting" })
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!response.ok) {
        const raw = await response.json().catch(() => ({}))
        const parsed = ErrorBodySchema.safeParse(raw)
        const message =
          parsed.success && parsed.data.error !== undefined
            ? parsed.data.error
            : phrase(formSomethingWrong.slug)
        setStatus({ kind: "error", message })
        return
      }
      setStatus({ kind: "success" })
    } catch {
      setStatus({ kind: "error", message: phrase(formNetworkError.slug) })
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Heading variant="subsection" as="h2" className="font-bold text-3xl text-primary">
          {section.title}
        </Heading>
        <Separator className="w-24 bg-accent" />
      </div>
      {section.text === null ? null : (
        <Text variant="prose" className="text-lg">
          {section.text}
        </Text>
      )}
      {status.kind === "success" ? (
        <Text variant="prose" className="text-accent text-lg" aria-live="polite">
          {phrase(subscribeThanks.slug)}
        </Text>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 sm:max-w-md"
          aria-label={phrase(subscribeFormLabel.slug)}
        >
          <label htmlFor={inputId} className="sr-only">
            {phrase(subscribeEmailLabel.slug)}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id={inputId}
              type="email"
              required
              autoComplete="email"
              placeholder={phrase(subscribePlaceholder.slug)}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (status.kind === "error") setStatus({ kind: "idle" })
              }}
              disabled={status.kind === "submitting"}
              className="sm:flex-1"
            />
            <Button
              type="submit"
              variant="accent"
              disabled={status.kind === "submitting"}
              aria-busy={status.kind === "submitting"}
            >
              {phrase(
                status.kind === "submitting" ? subscribeSubscribing.slug : subscribeButton.slug
              )}
            </Button>
          </div>
          {status.kind === "error" ? (
            <Text variant="prose" className="text-base text-destructive" role="alert">
              {status.message}
            </Text>
          ) : null}
        </form>
      )}
    </section>
  )
}
