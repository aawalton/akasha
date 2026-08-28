import { DisplayFrame } from "@shared/pages-ui/frame/display-frame"
import { FrameViewPropertiesMenu } from "@shared/pages-ui/frame/frame-view-properties-menu"
import { useRef } from "react"
import type { SessionEnvelope } from "../lib/client-envelope"
import { ActionComposer, ActionRows, useActionBox } from "./action-box"
import type { AwenGame } from "./awen-display"
import { AwenStatusDrawer } from "./awen-status-drawer"
import { ChapterProseChannel } from "./chapter-prose-channel"
import { HudPanel } from "./hud-panel"
import { NarrativeLog } from "./narrative-log"
import { QuestsPanel } from "./quests-panel"
import { SheetPanel } from "./sheet-panel"
import { StorySoFar } from "./story-so-far"

export function AwenLayout({ game, envelope }: { game: AwenGame; envelope: SessionEnvelope }) {
  const modules = game.display.modules
  const tagline = game.display.tagline
  const hasAside =
    modules.hud !== undefined || modules.sheet !== undefined || modules.quests !== undefined
  const hasActionBox = modules.actionBox !== undefined

  const gridBase = hasAside
    ? "mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-[clamp(14px,3vw,34px)] py-6 lg:grid-cols-[1fr_300px]"
    : "mx-auto flex max-w-[820px] flex-col gap-6 px-[clamp(14px,3vw,34px)] py-6"
  const spanClass = hasAside ? " lg:col-span-2" : ""

  const asidePanels = hasAside ? (
    <>
      {modules.hud !== undefined ? (
        <HudPanel hud={envelope.hud ?? null} pools={modules.hud.pools} />
      ) : null}
      {modules.quests !== undefined ? <QuestsPanel quests={envelope.quests ?? null} /> : null}
      {modules.sheet !== undefined ? <SheetPanel sheet={envelope.sheet ?? null} /> : null}
    </>
  ) : null

  const actionBox = useActionBox({
    gameExternalId: game.externalId,
    pendingActions: envelope.actionBox ?? [],
  })

  const newestRef = useRef<HTMLDivElement>(null)
  const turnCount = (envelope.chapterProse?.length ?? 0) + (envelope.beatLog?.length ?? 0)
  const proseGetsAnchor = modules.chapterProse !== undefined

  return (
    <DisplayFrame
      config={game.display.frame}
      header={{
        title: envelope.title,
        showBack: true,
        menu: (
          <div className="flex items-center gap-1">
            {hasAside ? <AwenStatusDrawer statusPanels={asidePanels} /> : null}
            <FrameViewPropertiesMenu />
          </div>
        ),
      }}
      footer={
        hasActionBox ? (
          <div className="px-[clamp(14px,3vw,34px)] py-2">
            <ActionComposer state={actionBox} />
          </div>
        ) : (
          <div aria-hidden />
        )
      }
      followAnchor={{ ref: newestRef, renderTrigger: turnCount }}
    >
      <div className={gridBase}>
        {tagline !== undefined ? (
          <p className={`font-mono text-tertiary text-xs${spanClass}`}>{tagline}</p>
        ) : null}

        {modules.storySoFar !== undefined ? (
          <StorySoFar
            chapters={envelope.storySoFar ?? []}
            {...(hasAside ? { className: "lg:col-span-2" } : {})}
          />
        ) : null}

        <div className="flex min-w-0 flex-col gap-4">
          {modules.chapterProse !== undefined ? (
            <ChapterProseChannel
              turns={envelope.chapterProse ?? []}
              externalId={game.externalId}
              titles={modules.chapterProse.titles}
              pastTurns={modules.chapterProse.pastTurns}
              newestRef={proseGetsAnchor ? newestRef : undefined}
            />
          ) : null}
          {modules.beatLog !== undefined ? (
            <NarrativeLog
              beats={envelope.beatLog ?? null}
              gameExternalId={game.externalId}
              newestRef={proseGetsAnchor ? undefined : newestRef}
            />
          ) : null}
          {hasActionBox ? (
            <ActionRows
              pendingActions={actionBox.pendingActions}
              visibleEchoes={actionBox.visibleEchoes}
            />
          ) : null}
        </div>

        {}
        {hasAside ? (
          <aside className="hidden flex-col gap-4 lg:sticky lg:top-6 lg:self-start min-[584px]:flex">
            {asidePanels}
          </aside>
        ) : null}
      </div>
    </DisplayFrame>
  )
}
