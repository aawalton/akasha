"use client"

import { GOOGLE } from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { safeRedirectTarget } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { useState } from "react"
import { useSearchParams } from "react-router"

const SIGN_IN_AT = "/api/auth/sign-in/social"

const SIGN_IN_PATH = "/sign-in"

const ALLOWED_REDIRECT_HOSTS = ["alanwalton.com"] as const

const REFUSED = "Google could not sign you in."

function urlIn(said: unknown): string | null {
  if (said === null || typeof said !== "object") return null
  const held = (said as { readonly url?: unknown }).url
  return typeof held === "string" && held !== "" ? held : null
}

export function GoogleSignIn() {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(searchParams.get("error"))
  const [going, setGoing] = useState(false)

  const start = async () => {
    setError(null)
    setGoing(true)
    const callbackURL =
      safeRedirectTarget({
        next: searchParams.get("next"),
        allowedHosts: ALLOWED_REDIRECT_HOSTS,
      }) ?? "/home"
    try {
      const answered = await fetch(SIGN_IN_AT, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ provider: GOOGLE, callbackURL, errorCallbackURL: SIGN_IN_PATH }),
      })
      const said: unknown = await answered.json()
      const url = answered.ok ? urlIn(said) : null
      if (url === null) {
        setError(REFUSED)
        setGoing(false)
        return
      }
      window.location.href = url
    } catch {
      setError(REFUSED)
      setGoing(false)
    }
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
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div data-slot="auth-form" className="flex flex-col gap-4">
            {error != null && (
              <p role="alert" className="text-red text-sm">
                {error}
              </p>
            )}
            <Button
              variant="accent"
              type="button"
              className={cn("w-full", going && "disabled:cursor-wait")}
              disabled={going}
              onClick={start}
            >
              {going ? (
                <>
                  <Spinner />
                  Going to Google...
                </>
              ) : (
                "Continue with Google"
              )}
            </Button>
          </div>
        </CardContent>
      </PanelCard>
    </div>
  )
}
