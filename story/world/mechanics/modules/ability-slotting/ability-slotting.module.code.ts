export type Holding = {
  readonly page: string
  readonly title: string
  readonly kind: string | null
  readonly experience: number
  readonly dormant: boolean | null
  readonly tierSteps: readonly number[]
}

export type SlotKind = {
  readonly page: string
  readonly title: string
  readonly pluralTitle: string
  readonly activeSlots: number | null
}

export type Wanted = "taken-up" | "set-aside"

export const WANTED: readonly Wanted[] = ["taken-up", "set-aside"]

export type SlotChange = {
  readonly page: string
  readonly note: string
  readonly key: string
  readonly from: unknown
  readonly to: unknown
}

export type Slotted =
  | { readonly event: string; readonly changes: readonly SlotChange[] }
  | { readonly refused: string }

const DORMANT = "dormant"

const EXPERIENCE = "experience"

export function tiersPassed(tierSteps: readonly number[], experience: number): number {
  return tierSteps.filter((step) => experience >= step).length
}

export function lastTierStep(tierSteps: readonly number[], experience: number): number {
  return tierSteps
    .filter((step) => experience >= step)
    .reduce((most, step) => Math.max(most, step), 0)
}

export function completed(one: Holding): boolean {
  const last = one.tierSteps.at(-1)
  return last !== undefined && one.experience >= last
}

export function holdsSlot(one: Holding): boolean {
  return one.dormant !== true && !completed(one)
}

export function slotsHeld(kind: SlotKind, held: readonly Holding[]): number {
  return held.filter((one) => one.kind === kind.page && holdsSlot(one)).length
}

function setAside(one: Holding): Slotted {
  if (one.dormant === true) return { refused: `${one.title} is set aside already.` }
  if (completed(one)) return { refused: `${one.title} is completed, so it holds no slot to free.` }
  if (one.tierSteps.length === 0) {
    return { refused: `${one.title} states no tiers, so what setting it aside loses is unknown.` }
  }
  const kept = lastTierStep(one.tierSteps, one.experience)
  const tiers = tiersPassed(one.tierSteps, one.experience)
  const aside: SlotChange = {
    page: one.page,
    note: `${one.title} set aside`,
    key: DORMANT,
    from: one.dormant,
    to: true,
  }
  const lost = one.experience - kept
  const dropped: readonly SlotChange[] =
    lost === 0
      ? []
      : [
          {
            page: one.page,
            note: `${one.title} loses ${String(lost)} toward its next tier`,
            key: EXPERIENCE,
            from: one.experience,
            to: kept,
          },
        ]
  return {
    event: `${one.title} is set aside at tier ${String(tiers)}.`,
    changes: [aside, ...dropped],
  }
}

function takenUp(one: Holding, kind: SlotKind, held: readonly Holding[]): Slotted {
  if (one.dormant !== true) return { refused: `${one.title} is being worked on already.` }
  const slots = kind.activeSlots ?? 0
  if (slotsHeld(kind, held) >= slots) {
    return {
      refused: `All ${String(slots)} ${kind.pluralTitle} slots are held, so set one aside first.`,
    }
  }
  return {
    event: `${one.title} is taken up again.`,
    changes: [
      { page: one.page, note: `${one.title} taken up again`, key: DORMANT, from: true, to: false },
    ],
  }
}

export function slotted(
  one: Holding,
  kind: SlotKind | null,
  held: readonly Holding[],
  wanted: Wanted
): Slotted {
  if (kind === null || kind.activeSlots === null) {
    return {
      refused: `${one.title} holds no slot, so it is used rather than set aside or taken up.`,
    }
  }
  return wanted === "set-aside" ? setAside(one) : takenUp(one, kind, held)
}
