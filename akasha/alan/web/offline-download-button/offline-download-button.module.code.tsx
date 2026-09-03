"use client"

import { Button } from "@akasha/design-primitives/button"
import { useState } from "react"
import { useSearchParams } from "react-router"
import { isNativeShell } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import { downloadChapter } from "../offline-downloads/offline-downloads.module.code.ts"

type Status = "idle" | "downloading" | "done" | "error"

interface OfflineDownloadButtonProps {
  pageId: string
  chapterTitle: string
  chapterNumber: number | null
  storyTitle: string | null
  variants: ReadonlyArray<{ id: string; label: string }>
}

function toPercent(fraction: number): number {
  return Math.min(100, Math.max(0, Math.round(fraction * 100)))
}

export function OfflineDownloadButton({
  pageId,
  chapterTitle,
  chapterNumber,
  storyTitle,
  variants,
}: OfflineDownloadButtonProps) {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<Status>("idle")
  const [percent, setPercent] = useState(0)

  if (!isNativeShell() || variants.length === 0) return null

  const selectedId = searchParams.get("variant")
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0]
  if (selected == null) return null

  const handleDownload = async (): Promise<void> => {
    setStatus("downloading")
    setPercent(0)
    try {
      await downloadChapter({
        pageId,
        narratorSlug: selected.id,
        narratorLabel: selected.label,
        chapterTitle,
        chapterNumber,
        storyTitle,
        onProgress: (fraction) => setPercent(toPercent(fraction)),
      })
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  const label =
    status === "downloading"
      ? `Downloading… ${percent}%`
      : status === "done"
        ? "Saved for offline"
        : status === "error"
          ? "Download failed — retry"
          : "Download for offline"

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={status === "downloading"}
        onClick={() => {
          void handleDownload()
        }}
      >
        {label}
      </Button>
      {status === "downloading" && (
        <p data-testid="offline-download-keep-open" className="text-tertiary text-xs italic">
          keep the app open until it finishes
        </p>
      )}
    </div>
  )
}
