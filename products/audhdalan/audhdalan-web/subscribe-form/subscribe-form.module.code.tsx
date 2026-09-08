import { Button } from "@akasha/design-primitives/button"
import { Heading } from "@akasha/design-primitives/heading"
import { Input } from "@akasha/design-primitives/input"
import { Separator } from "@akasha/design-primitives/separator"
import { Text } from "@akasha/design-primitives/text-body"
import { useId, useState } from "react"
import { z } from "zod"

const ErrorBodySchema = z.object({ error: z.string() }).partial()

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }

export function SubscribeForm() {
  const inputId = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (status.kind === "submitting" || status.kind === "success") return

    const trimmed = email.trim()
    if (trimmed === "" || !trimmed.includes("@")) {
      setStatus({ kind: "error", message: "Please enter a valid email address." })
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
            : "Something went wrong. Please try again."
        setStatus({ kind: "error", message })
        return
      }
      setStatus({ kind: "success" })
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." })
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Heading variant="subsection" as="h2" className="font-bold text-3xl text-primary">
          Stay in touch
        </Heading>
        <Separator className="w-24 bg-accent" />
      </div>
      <Text variant="prose" className="text-lg">
        Occasional notes on autism, ADHD, and energy management.
      </Text>
      {status.kind === "success" ? (
        <Text variant="prose" className="text-accent text-lg" aria-live="polite">
          Thanks — you're on the list.
        </Text>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 sm:max-w-md"
          aria-label="Email signup"
        >
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id={inputId}
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
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
              {status.kind === "submitting" ? "Subscribing…" : "Subscribe"}
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
