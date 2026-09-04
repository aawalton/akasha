import "../idle-look/idle-look.stylesheet.styles.css"
import { PageLayout } from "@akasha/design-layout/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@akasha/design-patterns/tabs"
import type { GameState } from "@akasha/idle-system/state"
import type { FrameConfig } from "@akasha/pages-core/schema/detail-config"
import { DisplayFrame } from "@akasha/pages-ui/frame/display-frame"
import { FrameViewPropertiesMenu } from "@akasha/pages-ui/frame/frame-view-properties-menu"
import { useEffect, useState, useSyncExternalStore } from "react"
import { z } from "zod"
import { ActiveBoosts } from "../active-boosts/active-boosts.module.code.tsx"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import { IdleCardView } from "../idle-card-view/idle-card-view.module.code.tsx"
import {
  type IdleGameSnapshot,
  idleGameStore,
} from "../idle-game-store/idle-game-store.module.code.ts"
import { AddSeatPicker } from "../lineup-header/lineup-header.module.code.tsx"
import { PrestigeCard } from "../prestige-card/prestige-card.module.code.tsx"
import { UniversalTitleBar } from "../universal-title-bar/universal-title-bar.module.code.tsx"
import {
  type IdleActions,
  useIdleActions,
} from "../use-idle-actions/use-idle-actions.module.code.ts"

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
