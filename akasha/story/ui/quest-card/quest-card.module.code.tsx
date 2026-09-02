import type { QuestStatus } from "@akasha/story-engine-core/quest-schema"
import type { ClientQuest } from "../client-session/client-session.module.code.ts"

const STATUS_LABEL: Record<QuestStatus, string> = {
  active: "Active",
  complete: "Complete",
}

const STATUS_CLASS: Record<QuestStatus, string> = {
  active: "text-blue",
  complete: "text-green",
}

export function QuestStatusBadge({ status }: { status: QuestStatus }) {
  return (
    <span
      className={`flex-none font-bold font-mono text-[10px] uppercase tracking-[0.18em] ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[2px]">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">{label}</div>
      <div className="text-[13px] text-secondary leading-[1.5]">{value}</div>
    </div>
  )
}

export function QuestFields({ quest }: { quest: ClientQuest }) {
  const conditions = quest.conditions ?? []
  return (
    <div className="flex flex-col gap-2">
      <Field label="Objective" value={quest.objective} />
      {conditions.length > 0 ? (
        <div className="flex flex-col gap-[2px]">
          <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">
            Conditions
          </div>
          <ul className="flex list-disc flex-col gap-[2px] pl-4">
            {conditions.map((c, i) => (
              <li key={i} className="text-[13px] text-secondary leading-[1.5]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {quest.reward != null && quest.reward !== "" ? (
        <Field label="Reward" value={quest.reward} />
      ) : null}
    </div>
  )
}
