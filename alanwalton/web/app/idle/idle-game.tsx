import "./idle.css"
import { PageLayout } from "@shared/design-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/design-patterns/components/tabs"
import { DisplayFrame } from "@shared/pages-ui/frame/display-frame"
import { FrameViewPropertiesMenu } from "@shared/pages-ui/frame/frame-view-properties-menu"
import { type FrameConfig } from "@shared/pages-ui/frame/frame-config"
import { useEffect, useState, useSyncExternalStore } from "react"
import { z } from "zod"
import { ActiveBoosts } from "~/idle/components/active-boosts"
import { IdleCardView } from "~/idle/components/idle-card-view"
import { AddSeatPicker } from "~/idle/components/lineup-header"
import { PrestigeCard } from "~/idle/components/prestige-card"
import { UniversalTitleBar } from "~/idle/components/universal-title-bar"
import type { GameState } from "./lib/core/types"
import { type IdleGameSnapshot, idleGameStore } from "~/idle/lib/idle-game-store"
import { type IdleActions, useIdleActions } from "~/idle/lib/use-idle-actions"
import { apiFetch } from "~/lib/api-fetch"

const RENDER_MS = 100

export function meta() {
  return [{ title: "Idle" }]
}

const loadEnvelopeSchema = z.looseObject({ save: z.unknown() })

type LoadOutcome =
  | { readonly kind: "ready"; readonly save: unknown }
  | { readonly kind: "nosave" }
  | { readonly kind: "signin" }
  | { readonly kind: "error" }

async function fetchSaveOnce(signal: AbortSignal): Promise<LoadOutcome> {
  try {
    const res = await apiFetch("/api/load", { signal, headers: { accept: "application/json" } })
    if (res.status === 401) {
      return { kind: "signin" }
    }
    if (!res.ok) {
      return { kind: "error" }
    }
    const envelope = loadEnvelopeSchema.parse(await res.json())
    if (envelope.save === null || envelope.save === undefined) {
      return { kind: "nosave" }
    }
    return { kind: "ready", save: envelope.save }
  } catch {
    return { kind: "error" }
  }
}

export default function Home({
  title,
  frameConfig,
}: {
  title?: string | null
  frameConfig?: FrameConfig | null
} = {}) {
  const snap = useSyncExternalStore(
    idleGameStore.subscribe,
    idleGameStore.getSnapshot,
    idleGameStore.getSnapshot
  )
  const actions = useIdleActions()
  const [now, setNow] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const boot = async (): Promise<void> => {
      const outcome = await fetchSaveOnce(controller.signal)
      if (!active) {
        return
      }
      if (outcome.kind === "ready") {
        idleGameStore.load(outcome.save, "ready")
      } else if (outcome.kind === "nosave") {
        idleGameStore.load(undefined, "nosave")
      } else if (outcome.kind === "signin") {
        idleGameStore.load(undefined, "signin")
      }
    }
    void boot()
    return () => {
      active = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => {
      setNow(Date.now())
    }, RENDER_MS)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <DisplayFrame
      config={frameConfig ?? undefined}
      header={{
        title: title != null && title !== "" ? title : "Idle",
        showBack: true,
        menu: <FrameViewPropertiesMenu />,
      }}
    >
      <PageLayout>
        <PageLayout.Content>
          <IdleScreen snap={snap} now={now} actions={actions} />
        </PageLayout.Content>
      </PageLayout>
    </DisplayFrame>
  )
}

function IdleScreen({
  snap,
  now,
  actions,
}: {
  snap: IdleGameSnapshot
  now: number
  actions: IdleActions
}) {
  if (snap.status === "signin") {
    return <p className="status-line">Sign in to see your save.</p>
  }
  if (snap.state === null) {
    const message = snap.status === "nosave" ? "No save yet." : "Loading…"
    return <p className="status-line">{message}</p>
  }
  return <MergedScreen state={snap.state} now={now} actions={actions} />
}

function MergedScreen({
  state,
  now,
  actions,
}: {
  state: GameState
  now: number
  actions: IdleActions
}) {
  return (
    <div className="flex flex-col gap-6">
      <UniversalTitleBar state={state} now={now} actions={actions} />
      <Tabs defaultValue="lineup" syncUrl className="gap-6">
        <TabsList>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
        </TabsList>
        <TabsContent value="lineup" className="flex flex-col gap-6">
          <AddSeatPicker state={state} actions={actions} />
          <ActiveBoosts state={state} />
          <IdleCardView view="lineup" now={now} />
          <PrestigeCard state={state} actions={actions} />
        </TabsContent>
        <TabsContent value="roster">
          <IdleCardView view="roster" now={now} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
