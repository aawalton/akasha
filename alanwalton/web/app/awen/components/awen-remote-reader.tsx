"use client"

import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { type ReactNode, useEffect, useState } from "react"
import { API_ORIGIN } from "~/lib/api-origin"
import { AwenGameReader } from "../game-reader"
import { AwenDisplayPropsSchema } from "../lib/client-envelope"
import type { AwenDisplayProps } from "./awen-display"

type FetchState =
  | { readonly status: "loading" }
  | { readonly status: "error" }
  | { readonly status: "ready"; readonly props: AwenDisplayProps }

export function AwenRemoteReader({
  externalId,
  fallback,
}: {
  externalId: string
  fallback: ReactNode
}) {
  const [state, setState] = useState<FetchState>({ status: "loading" })

  useEffect(() => {
    let alive = true
    setState({ status: "loading" })
    const run = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/api/awen-game/${externalId}`, {
          headers: { accept: "application/json" },
        })
        if (!res.ok) throw new Error(`awen-game fetch: status ${res.status}`)
        const raw: unknown = await res.json()
        const props = AwenDisplayPropsSchema.parse(raw)
        if (alive) setState({ status: "ready", props })
      } catch {
        if (alive) setState({ status: "error" })
      }
    }
    void run()
    return () => {
      alive = false
    }
  }, [externalId])

  if (state.status === "loading") {
    return (
      <main className="mx-auto max-w-2xl p-6 text-primary">
        <p className="text-secondary">Loading…</p>
      </main>
    )
  }
  if (state.status === "error") return <>{fallback}</>
  return (
    <SurfaceProvider level={0} className="min-h-screen">
      <AwenGameReader {...state.props} />
    </SurfaceProvider>
  )
}
