import type { ItemAward, QuestWindow, StatusAssessment, SystemWindow, TalentActivation } from "@alanwalton/awen-core/system-window-schema"
import { SurfaceProvider } from "@shared/design-system"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { SystemChoiceCard } from "./system-choice-card"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[2px]">
      <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">{label}</div>
      <div className="text-[13px] text-secondary leading-[1.5]">{value}</div>
    </div>
  )
}

function ReadoutGrid({ record }: { record: Record<string, number> }) {
  const entries = Object.entries(record)
  if (entries.length === 0) return null
  return (
    <div className="grid grid-cols-2 gap-x-[14px] gap-y-[6px] font-mono text-[12px]">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-baseline justify-between gap-2 border-surface-3 border-b border-dotted py-[2px]"
        >
          <span className="min-w-0 break-words text-tertiary">{key}</span>
          <b className="flex-none font-bold text-accent tabular-nums">{value}</b>
        </div>
      ))}
    </div>
  )
}

function WindowFrame({
  banner,
  bannerClass,
  children,
}: {
  banner: string
  bannerClass: string
  children: React.ReactNode
}) {
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-2 rounded-xl p-4 shadow-sm">
      <div className={`font-bold font-mono text-[11px] uppercase tracking-[0.2em] ${bannerClass}`}>
        {banner}
      </div>
      {children}
    </SurfaceProvider>
  )
}

function QuestWindowCard({
  banner,
  bannerClass,
  quest,
}: {
  banner: string
  bannerClass: string
  quest: QuestWindow
}) {
  return (
    <WindowFrame banner={banner} bannerClass={bannerClass}>
      <div className="font-mono font-semibold text-[14px] text-primary">{quest.title}</div>
      <Field label="Objective" value={quest.objective} />
      {quest.reward != null && quest.reward !== "" ? (
        <Field label="Reward" value={quest.reward} />
      ) : null}
    </WindowFrame>
  )
}

function StatusAssessmentCard({ assessment }: { assessment: StatusAssessment }) {
  return (
    <WindowFrame banner="Status Assessment" bannerClass="text-accent">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono font-semibold text-[14px] text-primary">{assessment.name}</span>
        {assessment.level != null ? (
          <span className="flex-none font-mono font-semibold text-[12px] text-secondary">
            Lv {assessment.level}
          </span>
        ) : null}
      </div>
      {assessment.class != null ? (
        <div className="flex justify-between font-mono text-[12px]">
          <span className="text-tertiary">Class</span>
          <b className="font-bold text-accent">{assessment.class}</b>
        </div>
      ) : null}
      {assessment.attributes != null ? (
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">
            Attributes
          </div>
          <ReadoutGrid record={assessment.attributes} />
        </div>
      ) : null}
      {assessment.pools != null ? (
        <div className={`flex flex-col gap-1 rounded-lg ${surfaceClass(2)} p-2`}>
          <div className="font-mono text-[10px] text-tertiary uppercase tracking-[0.16em]">
            Pools
          </div>
          <ReadoutGrid record={assessment.pools} />
        </div>
      ) : null}
    </WindowFrame>
  )
}

function TalentActivationCard({ activation }: { activation: TalentActivation }) {
  return (
    <WindowFrame banner="Talent Activation" bannerClass="text-accent">
      <Field label="Holder" value={activation.holder} />
      <Field label="Talent" value={activation.talent} />
      <Field label="Status" value={activation.status} />
      {activation.note != null && activation.note !== "" ? (
        <Field label="Note" value={activation.note} />
      ) : null}
    </WindowFrame>
  )
}

function ItemAwardCard({ award }: { award: ItemAward }) {
  return (
    <WindowFrame banner="Item Acquired" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{award.item}</div>
      {award.descriptors?.map((descriptor, index) => (
        <Field
          key={`${descriptor.label}-${index}`}
          label={descriptor.label}
          value={descriptor.value}
        />
      ))}
    </WindowFrame>
  )
}

function LevelUpCard({ level, attrPoints }: { level: number; attrPoints?: number }) {
  return (
    <WindowFrame banner="Level Up" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">Level {level}</div>
      {attrPoints != null ? <Field label="Attribute Points" value={String(attrPoints)} /> : null}
    </WindowFrame>
  )
}

function SkillCard({ skill, rank }: { skill: string; rank?: string }) {
  return (
    <WindowFrame banner="Skill" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{skill}</div>
      {rank != null && rank !== "" ? <Field label="Rank" value={rank} /> : null}
    </WindowFrame>
  )
}

function AffinityCard({ affinity }: { affinity: string }) {
  return (
    <WindowFrame banner="Affinity" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{affinity}</div>
    </WindowFrame>
  )
}

function ClassCard({ className }: { className: string }) {
  return (
    <WindowFrame banner="Class" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{className}</div>
    </WindowFrame>
  )
}

function TitleCard({ title }: { title: string }) {
  return (
    <WindowFrame banner="Title" bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{title}</div>
    </WindowFrame>
  )
}

export function SystemWindowCard({
  window,
  gameExternalId,
  windowId,
}: {
  window: SystemWindow
  gameExternalId?: string
  windowId?: string
}) {
  switch (window.type) {
    case "quest-added":
      return <QuestWindowCard banner="Quest Added" bannerClass="text-accent" quest={window.quest} />
    case "quest-complete":
      return (
        <QuestWindowCard banner="Quest Complete" bannerClass="text-green" quest={window.quest} />
      )
    case "item-award":
      return <ItemAwardCard award={window.award} />
    case "status-assessment":
      return <StatusAssessmentCard assessment={window.assessment} />
    case "talent-activation":
      return <TalentActivationCard activation={window.activation} />
    case "system-choice":
      return (
        <SystemChoiceCard
          choice={window.choice}
          gameExternalId={gameExternalId}
          windowId={windowId}
        />
      )
    case "level-up":
      return <LevelUpCard level={window.level} attrPoints={window.attrPoints} />
    case "skill":
      return <SkillCard skill={window.skill} rank={window.rank} />
    case "affinity":
      return <AffinityCard affinity={window.affinity} />
    case "class":
      return <ClassCard className={window.class} />
    case "title":
      return <TitleCard title={window.title} />
    default:
      return assertNever(window)
  }
}
