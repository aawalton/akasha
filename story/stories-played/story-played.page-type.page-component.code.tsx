import type { AwenDisplayProps } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import { HudPanel } from "akasha/story/ui/modules/hud-panel/hud-panel.module.code.tsx"
import { QuestsPanel } from "akasha/story/ui/modules/quests-panel/quests-panel.module.code.tsx"
import { SheetPanel } from "akasha/story/ui/modules/sheet-panel/sheet-panel.module.code.tsx"
import { StorySoFar } from "akasha/story/ui/modules/story-so-far/story-so-far.module.code.tsx"

export function Drawing({ game, initialEnvelope }: AwenDisplayProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2>{game.title}</h2>
      <StorySoFar chapters={initialEnvelope.storySoFar ?? []} />
      <HudPanel hud={initialEnvelope.hud ?? null} />
      <SheetPanel sheet={initialEnvelope.sheet ?? null} />
      <QuestsPanel quests={initialEnvelope.quests ?? null} />
    </section>
  )
}
