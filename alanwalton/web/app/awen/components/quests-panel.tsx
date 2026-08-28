import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { ClientQuest } from "../lib/client-session"
import { deriveQuestPanel } from "../lib/quest-projection"
import { QuestFields, QuestStatusBadge } from "./quest-card"

function QuestRow({ quest }: { quest: ClientQuest }) {
  return (
    <div className={`flex flex-col gap-2 rounded-lg ${surfaceClass(2)} p-3`}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="min-w-0 break-words font-mono font-semibold text-[13px] text-primary">
          {quest.title}
        </span>
        <QuestStatusBadge status={quest.status} />
      </div>
      <QuestFields quest={quest} />
    </div>
  )
}

export function QuestsPanel({ quests }: { quests: readonly ClientQuest[] | null }) {
  const inPlay = quests === null ? [] : deriveQuestPanel(quests)
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.2em]">Quests</div>
      {inPlay.length === 0 ? (
        <div className="font-mono text-[12px] text-tertiary">No active quests.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {inPlay.map((quest) => (
            <QuestRow key={quest.id} quest={quest} />
          ))}
        </div>
      )}
    </SurfaceProvider>
  )
}
