"use client"

import { Card, CardContent } from "@akasha/design-primitives/card"
import { Heading } from "@akasha/design-primitives/heading"
import { Text } from "@akasha/design-primitives/text-body"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { AlertTriangle, CheckCircle2, CircleDashed, Clock, FileUp } from "lucide-react"
import { formatTimeAgo } from "../format-time-ago/format-time-ago.module.code.ts"
import type {
  WatcherSyncSourceCounts,
  WatcherSyncSummary,
} from "../watcher-sync-status/watcher-sync-status.module.code.ts"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  title: string
  body: string
}

function ago(iso: string | null): string {
  return iso === null ? "" : ` ${formatTimeAgo(iso)}`
}

function present(sync: WatcherSyncSummary): Presentation {
  switch (sync.verdict) {
    case "not-connected":
      return {
        icon: CircleDashed,
        tone: "text-tertiary",
        title: "Nothing has synced yet",
        body: "Temper has never received game data for this account — no characters and no inventory. Everything below is what it takes to change that.",
      }
    case "connected-no-data":
      return {
        icon: AlertTriangle,
        tone: "text-orange",
        title: "Linked, but no game data has arrived",
        body: `The Watcher linked to this account${ago(sync.connectedAt)}, and Temper has received nothing since — no characters and no inventory. The most common cause is the Temper ESO add-ons not being installed in your game, since the Watcher only reads the files those add-ons write. If they are installed and this still shows nothing, the problem is not your setup.`,
      }
    case "data-without-watcher":
      return {
        icon: FileUp,
        tone: "text-secondary",
        title: `Last imported by hand${ago(sync.lastContactAt)}`,
        body: `Temper has your data, but no Watcher is linked to this account, so nothing updates on its own.${dataDateSentence(sync)} Import again whenever you want Temper to see fresh data.`,
      }
    case "connected-stale-data":
      return {
        icon: Clock,
        tone: "text-secondary",
        title: `Game data captured${ago(sync.dataCapturedAt)}`,
        body: `The Watcher reached Temper${ago(sync.lastContactAt)}, but the newest game data it sent was captured${ago(sync.dataCapturedAt)}. Temper cannot tell from here whether you simply have not played since then, or the add-ons have stopped writing the files the Watcher reads. Play for a few minutes, then check whether the capture time above moves.`,
      }
    case "syncing":
      return presentSyncing(sync)
    default:
      return assertNever(sync.verdict)
  }
}

function dataDateSentence(sync: WatcherSyncSummary): string {
  return sync.dataCapturedAt === null
    ? ""
    : ` The newest game data Temper holds was captured${ago(sync.dataCapturedAt)}.`
}

function presentSyncing(sync: WatcherSyncSummary): Presentation {
  if (sync.dataCapturedAt === null) {
    return {
      icon: CircleDashed,
      tone: "text-secondary",
      title: `Watcher last reached Temper${ago(sync.lastContactAt)}`,
      body: "The Watcher is linked and reaching Temper, but no inventory has arrived, so Temper cannot say how old your game data is. The times below are when each source last reached Temper — not when the game recorded it.",
    }
  }

  if (sync.characters.count === 0) {
    return {
      icon: CircleDashed,
      tone: "text-secondary",
      title: `Game data captured${ago(sync.dataCapturedAt)}`,
      body: "Your inventory is arriving, but no characters have, so Temper is seeing only part of this account. The Temper ESO add-ons are installed separately, and the one that exports characters may be missing.",
    }
  }

  return {
    icon: CheckCircle2,
    tone: "text-green",
    title: `Game data captured${ago(sync.dataCapturedAt)}`,
    body: "The Watcher is linked, and the newest game data it sent was captured at the time above. If that capture time stops advancing while you play, what reaches Temper has stopped.",
  }
}

function sourceDetail(
  source: WatcherSyncSourceCounts,
  countLabel: ((count: number) => string) | null
): string {
  if (source.count === 0) return "none received yet"

  const parts = [
    ...(countLabel === null ? [] : [countLabel(source.count)]),
    ...(source.capturedAt === null ? [] : [`captured${ago(source.capturedAt)}`]),
    ...(source.lastContactAt === null ? [] : [`last received${ago(source.lastContactAt)}`]),
  ]

  return parts.length === 0 ? "received" : parts.join(" · ")
}

function SourceRow({
  label,
  source,
  countLabel,
}: {
  label: string
  source: WatcherSyncSourceCounts
  countLabel: ((count: number) => string) | null
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-secondary">{label}</span>
      <span className={source.count === 0 ? "text-tertiary" : "text-primary"}>
        {sourceDetail(source, countLabel)}
      </span>
    </div>
  )
}

export function WatcherSyncStatusCard({ sync }: { sync: WatcherSyncSummary }) {
  const { icon: Icon, tone, title, body } = present(sync)

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Icon className={`h-5 w-5 shrink-0 translate-y-0.5 ${tone}`} aria-hidden />
          <div className="flex flex-col gap-1">
            <Heading as="h2">{title}</Heading>
            <Text variant="prose">{body}</Text>
          </div>
        </div>

        {}
        <div className="flex flex-col gap-1 border-border border-t pt-3">
          <SourceRow
            label="Characters"
            source={sync.characters}
            countLabel={(n) => `${n} character${n === 1 ? "" : "s"}`}
          />
          <SourceRow label="Inventory" source={sync.inventory} countLabel={null} />
        </div>
      </CardContent>
    </Card>
  )
}
