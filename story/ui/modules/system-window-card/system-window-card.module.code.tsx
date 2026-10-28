import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Asked } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import {
  abilityTitleIn,
  tierIn,
  toldIn,
  unlockIn,
} from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"
import type {
  ItemAward,
  QuestWindow,
  StatusAssessment,
  SystemWindow,
  TalentActivation,
} from "akasha/story/engine/core/modules/system-window-schema/system-window-schema.module.code.ts"
import { CardField } from "akasha/story/ui/modules/card-field/card-field.module.code.tsx"
import {
  type SubmitPlayerAction,
  SystemChoiceCard,
} from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import {
  ABILITY_KIND_KEY,
  ACTIVE_SLOTS_KEY,
  abilityKindSlugsIn,
  crossedHeadingOf,
  type HeldAbility,
  heldAbilityOf,
  SLUG_KEY,
  TIER_STEPS_KEY,
  TITLE_KEY,
  unlockedHeadingOf,
} from "akasha/story/world/mechanics/ability-kinds/modules/ability-kind-titles/ability-kind-titles.module.code.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { useEffect, useState } from "react"

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
      <CardField label="Objective" value={quest.objective} />
      {quest.reward != null && quest.reward !== "" ? (
        <CardField label="Reward" value={quest.reward} />
      ) : null}
    </WindowFrame>
  )
}

function StatusAssessmentCard({ assessment }: { assessment: StatusAssessment }) {
  const held = useHeldAbility(assessment.name)
  const all = assessment.descriptors ?? []
  const descriptors = held === null || held?.slotted === false ? all : toldIn(all)
  const tier = tierIn(all)
  const banner =
    held === undefined
      ? UNSETTLED
      : held === null || tier === null
        ? STATUS
        : crossedHeadingOf(held, tier)
  return (
    <WindowFrame banner={banner} bannerClass="text-accent">
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
      {descriptors?.map((descriptor, index) => (
        <CardField
          key={`${descriptor.label}-${index}`}
          label={descriptor.label}
          value={descriptor.value}
        />
      ))}
    </WindowFrame>
  )
}

function TalentActivationCard({ activation }: { activation: TalentActivation }) {
  return (
    <WindowFrame banner="Talent Activation" bannerClass="text-accent">
      <CardField label="Holder" value={activation.holder} />
      <CardField label="Talent" value={activation.talent} />
      <CardField label="Status" value={activation.status} />
      {activation.note != null && activation.note !== "" ? (
        <CardField label="Note" value={activation.note} />
      ) : null}
    </WindowFrame>
  )
}

const LETTERED = /\p{L}/u

type Descriptor = NonNullable<ItemAward["descriptors"]>[number]

function abilityNamedIn(descriptors: readonly Descriptor[]): string {
  const named = descriptors.find(
    (one) => one.label !== "" && LETTERED.test(one.value) && toldIn([one]).length === 1
  )
  return named?.value.trim() ?? ""
}

function ItemAwardCard({ award }: { award: ItemAward }) {
  const all = award.descriptors ?? []
  const named = abilityNamedIn(all)
  const held = useHeldAbility(named)
  const unlock =
    held == null
      ? null
      : unlockIn(all, (title) => (title === abilityTitleIn(named) ? held.kind : undefined))
  const reading = named !== "" && held === undefined
  const banner = reading ? UNSETTLED : unlock === null ? ITEM : `${unlock.kind}${UNLOCKED}`
  const shown = reading ? toldIn(all) : (unlock?.rest ?? all)
  return (
    <WindowFrame banner={banner} bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">
        {unlock?.name ?? award.item}
      </div>
      {shown.map((descriptor, index) => (
        <CardField
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
      {attrPoints != null ? (
        <CardField label="Attribute Points" value={String(attrPoints)} />
      ) : null}
    </WindowFrame>
  )
}

const SKILL = "Skill"

const STATUS = "Status Assessment"

const ITEM = "Item Acquired"

const UNLOCKED = " Unlocked"

const UNSETTLED = " "

function valuesOf(asked: Asked): readonly Readonly<Record<string, unknown>>[] {
  return asked.ok ? asked.answer.rows.map((row) => row.values) : []
}

async function heldAbilityNamed(name: string): Promise<HeldAbility | null> {
  const title = abilityTitleIn(name)
  const skills = valuesOf(
    await askedLoudly({
      "page-type": worldSkill.slug,
      where: { title: { is: title } },
      keys: [TITLE_KEY, ABILITY_KIND_KEY, TIER_STEPS_KEY],
    })
  )
  const slugs = abilityKindSlugsIn(skills)
  const kinds =
    slugs.length === 0
      ? []
      : valuesOf(
          await askedLoudly({
            "page-type": worldAbilityKind.slug,
            where: { slug: { in: [...slugs] } },
            keys: [SLUG_KEY, TITLE_KEY, ACTIVE_SLOTS_KEY],
          })
        )
  return heldAbilityOf(title, skills, kinds)
}

function useHeldAbility(name: string): HeldAbility | null | undefined {
  const [held, setHeld] = useState<HeldAbility | null | undefined>(undefined)
  useEffect(() => {
    let alive = true
    void heldAbilityNamed(name)
      .catch((thrown: unknown) => {
        reportThrown(`reading the ability ${name}`, thrown)
        return null
      })
      .then((said) => {
        if (alive) setHeld(said)
      })
    return () => {
      alive = false
    }
  }, [name])
  return held
}

function SkillCard({ skill, rank }: { skill: string; rank?: string }) {
  const held = useHeldAbility(skill)
  const banner = held === undefined ? UNSETTLED : held === null ? SKILL : unlockedHeadingOf(held)
  return (
    <WindowFrame banner={banner} bannerClass="text-accent">
      <div className="font-mono font-semibold text-[14px] text-primary">{skill}</div>
      {rank != null && rank !== "" ? <CardField label="Rank" value={rank} /> : null}
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
  submitPlayerAction,
  signedOutNotice,
}: {
  window: SystemWindow
  gameExternalId?: string
  windowId?: string
  submitPlayerAction: SubmitPlayerAction
  signedOutNotice: React.ReactNode
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
          submitPlayerAction={submitPlayerAction}
          signedOutNotice={signedOutNotice}
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
