"use client"

import type { ResolvedGameDisplay } from "@alanwalton/awen-core/game-schema"
import { useEffect, useState } from "react"
import { API_ORIGIN } from "~/lib/api-origin"
import { useContentAlerts } from "../hooks/use-content-alerts"
import { type SessionEnvelope, SessionEnvelopeSchema } from "../lib/client-envelope"
import { AlertControls } from "./alert-controls"
import { AwenLayout } from "./awen-layout"

export interface AwenGame {
  externalId: string
  title: string
  display: ResolvedGameDisplay
}

export interface AwenDisplayProps {
  game: AwenGame
  initialEnvelope: SessionEnvelope
}

export function AwenDisplay({ game, initialEnvelope }: AwenDisplayProps) {
  const [envelope, setEnvelope] = useState<SessionEnvelope>(initialEnvelope)
  const pollMs = game.display.pollMs

  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout> | undefined
    const tick = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/api/session/${game.externalId}`, {
          headers: { accept: "application/json" },
        })
        if (res.ok && alive) {
          const raw: unknown = await res.json()
          setEnvelope(SessionEnvelopeSchema.parse(raw))
        }
      } catch {}
      if (alive) timer = setTimeout(tick, pollMs)
    }
    timer = setTimeout(tick, pollMs)
    return () => {
      alive = false
      if (timer !== undefined) clearTimeout(timer)
    }
  }, [game.externalId, pollMs])

  const { needsPermissionPrompt, enableAlerts } = useContentAlerts(envelope, game)

  return (
    <>
      <AlertControls needsPermissionPrompt={needsPermissionPrompt} onEnable={enableAlerts} />
      <AwenLayout game={game} envelope={envelope} />
    </>
  )
}
