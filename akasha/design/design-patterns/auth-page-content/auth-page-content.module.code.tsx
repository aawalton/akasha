"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import { CardContent, CardHeader, CardTitle } from "@akasha/design-primitives/card"
import { cn } from "@akasha/design-primitives/cn"
import { Input } from "@akasha/design-primitives/input"
import { Label } from "@akasha/design-primitives/label"
import { Spinner } from "@akasha/design-primitives/spinner"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { ReactNode } from "react"
import { useState } from "react"

export type AuthMode = "sign-in" | "sign-up"

const MIN_PASSWORD_LENGTH = 8

export interface AuthSubmitPayload {
  email: string
  password: string
  mode: AuthMode
}

export interface AuthPageContentProps {
  variant?: "card" | "plain"
  mode: AuthMode
  onSubmit: (
    payload: AuthSubmitPayload
  ) => Promise<undefined | { error?: string } | { redirect: string } | { notice: ReactNode }>
  allowModeToggle?: boolean
  onModeChange?: (mode: AuthMode) => void
  header?: ReactNode | ((mode: AuthMode) => ReactNode)
  title?: string
  submitLabel?: string
  togglePrompt?: { signIn: string; signUp: string }
  emailPlaceholder?: string
  recoveryNotice?: ReactNode
}

export function AuthPageContent({
  variant = "card",
  mode,
  onSubmit,
  allowModeToggle = false,
  onModeChange,
  header,
  title,
  submitLabel,
  togglePrompt,
  emailPlaceholder = "email@example.com",
  recoveryNotice,
}: AuthPageContentProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<ReactNode | null>(null)
  const [recoveryOpen, setRecoveryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isSignIn = mode === "sign-in"
  const resolvedTitle = title ?? (isSignIn ? "Sign In" : "Sign Up")
  const resolvedSubmitLabel = submitLabel ?? (isSignIn ? "Sign In" : "Sign Up")
  const showRecovery = isSignIn && recoveryNotice != null

  const fail = (message: string) => {
    setError(message)
    if (isSignIn) setRecoveryOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!isSignIn) {
      if (password.length < MIN_PASSWORD_LENGTH) {
        setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }
    }

    setIsLoading(true)

    try {
      const result = await onSubmit({ email, password, mode })
      if (result && "redirect" in result) {
        window.location.href = result.redirect
        return
      }
      if (result && "notice" in result) {
        setNotice(result.notice)
        return
      }
      if (result && "error" in result && result.error != null) {
        fail(result.error)
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        typeof error.digest === "string" &&
        error.digest.startsWith("NEXT_REDIRECT")
      ) {
        throw error
      }
      fail("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = (next: AuthMode) => {
    setError(null)
    setNotice(null)
    setConfirmPassword("")
    setRecoveryOpen(false)
    onModeChange?.(next)
  }

  const resolvedHeader = typeof header === "function" ? header(mode) : header

  const form = (
    <form onSubmit={handleSubmit} data-slot="auth-form" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete={isSignIn ? "username" : "email"}
            placeholder={emailPlaceholder}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password">Password</Label>
            {showRecovery && (
              <button
                type="button"
                onClick={() => setRecoveryOpen((open) => !open)}
                aria-expanded={recoveryOpen}
                aria-controls="password-recovery"
                className="cursor-pointer text-sm text-tertiary underline underline-offset-4 hover:text-accent"
              >
                Forgot password?
              </button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignIn && (
            <p className="text-sm text-tertiary">At least {MIN_PASSWORD_LENGTH} characters.</p>
          )}
          {showRecovery && recoveryOpen && (
            <div id="password-recovery" className="text-sm text-tertiary">
              {recoveryNotice}
            </div>
          )}
        </div>
        {!isSignIn && (
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {error != null && (
          <p role="alert" className="text-red text-sm">
            {error}
          </p>
        )}
        <Button
          variant="accent"
          type="submit"
          className={cn("w-full", isLoading && "disabled:cursor-wait")}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              {isSignIn ? "Signing in..." : "Signing up..."}
            </>
          ) : (
            resolvedSubmitLabel
          )}
        </Button>
        {!isSignIn && (
          <p className="text-center text-sm text-tertiary">
            {"Signing up signs you in right away \u2014 no email confirmation needed."}
          </p>
        )}
      </div>
      {allowModeToggle && onModeChange && (
        <div className="text-center text-sm text-tertiary">
          {isSignIn
            ? (togglePrompt?.signIn ?? "Don\u2019t have an account? ")
            : (togglePrompt?.signUp ?? "Already have an account? ")}
          <button
            type="button"
            onClick={() => handleModeChange(isSignIn ? "sign-up" : "sign-in")}
            className="cursor-pointer text-primary underline underline-offset-4 hover:text-accent"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </div>
      )}
    </form>
  )

  const body =
    notice != null ? (
      <div data-slot="auth-notice" className="flex flex-col gap-3 text-secondary text-sm">
        {notice}
      </div>
    ) : (
      form
    )

  if (variant === "plain") {
    return (
      <main className="mx-auto max-w-sm py-24" data-slot="auth-page">
        {resolvedHeader}
        {body}
      </main>
    )
  }

  return (
    <div
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
        surfaceClass(0)
      )}
      data-slot="auth-page"
    >
      <PanelCard id="auth">
        <CardHeader>
          <CardTitle className="text-2xl">{resolvedTitle}</CardTitle>
        </CardHeader>
        <CardContent>{body}</CardContent>
      </PanelCard>
    </div>
  )
}
