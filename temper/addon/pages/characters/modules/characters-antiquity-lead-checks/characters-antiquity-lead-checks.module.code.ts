import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function isMotifAntiquity(name: string): boolean {
  const [a] = string.find(name, "Ancestral", 1, true)
  if (a === 1) return true
  const [b] = string.find(name, "Ancient Daedric", 1, true)
  return b === 1
}

interface ActiveAntiquityLead {
  readonly antiquityId: number
  readonly name: string
  readonly quality: number
  readonly loreRemaining: number
}

export interface OutstandingAntiquity {
  readonly antiquityId: number
  readonly name: string
  readonly source: "held" | "scry" | "dig" | "buy"
  readonly parentName: string | undefined
  readonly lore: AntiquityLoreProgress | undefined
}

interface AntiquityLoreProgress {
  readonly current: number
  readonly total: number
}

interface EasyLeadSource {
  readonly kind: "scry" | "dig" | "buy"
  readonly parentId: number | undefined
}

interface LeadSourcesView {
  getAntiquityLeadSource?: (this: void, antiquityId: number) => EasyLeadSource | undefined
}

interface LeadSourcesHost {
  TemperWorldLeads?: LeadSourcesView
}

function asLeadSourcesHost(this: void, value: unknown): LeadSourcesHost {
  return value as LeadSourcesHost
}

export function canReadLeadSources(): boolean {
  return asLeadSourcesHost(globalThis).TemperWorldLeads?.getAntiquityLeadSource !== undefined
}

function easyLeadSourceOf(this: void, antiquityId: number): EasyLeadSource | undefined {
  return asLeadSourcesHost(globalThis).TemperWorldLeads?.getAntiquityLeadSource?.(antiquityId)
}

function antiquityNameOf(this: void, antiquityId: number): string {
  return zo_strformat("<<1>>", GetAntiquityName(antiquityId))
}

function loreRemainingOf(this: void, antiquityId: number): number {
  const total = GetNumAntiquityLoreEntries(antiquityId)
  return total > 0 ? math.max(0, total - GetNumAntiquityLoreEntriesAcquired(antiquityId)) : 0
}

function loreProgressOf(this: void, antiquityId: number): AntiquityLoreProgress | undefined {
  const total = GetNumAntiquityLoreEntries(antiquityId)
  const current = GetNumAntiquityLoreEntriesAcquired(antiquityId)
  return total > 0 && current < total ? { current, total } : undefined
}

function heldLeadOf(this: void, antiquityId: number): ActiveAntiquityLead {
  return {
    antiquityId,
    name: antiquityNameOf(antiquityId),
    quality: GetAntiquityQuality(antiquityId),
    loreRemaining: loreRemainingOf(antiquityId),
  }
}

function outstandingAntiquityOf(
  this: void,
  antiquityId: number,
  isLeftToDig: (this: void, lead: ActiveAntiquityLead) => boolean
): OutstandingAntiquity | undefined {
  if (DoesAntiquityHaveLead(antiquityId)) {
    const lead = heldLeadOf(antiquityId)
    if (!isLeftToDig(lead)) return undefined
    return {
      antiquityId,
      name: lead.name,
      source: "held",
      parentName: undefined,
      lore: loreProgressOf(antiquityId),
    }
  }
  if (loreRemainingOf(antiquityId) === 0) return undefined
  const easy = easyLeadSourceOf(antiquityId)
  if (easy === undefined) return undefined
  return {
    antiquityId,
    name: antiquityNameOf(antiquityId),
    source: easy.kind,
    parentName: easy.parentId === undefined ? undefined : antiquityNameOf(easy.parentId),
    lore: loreProgressOf(antiquityId),
  }
}

export function collectOutstandingAntiquities(
  isLeftToDig: (this: void, lead: ActiveAntiquityLead) => boolean
): OutstandingAntiquity[] {
  const outstanding: OutstandingAntiquity[] = []
  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const entry = outstandingAntiquityOf(antiquityId, isLeftToDig)
    if (entry !== undefined) outstanding.push(entry)
    antiquityId = GetNextAntiquityId(antiquityId)
  }
  return outstanding
}

function isLegendaryLead(lead: ActiveAntiquityLead): boolean {
  return lead.quality === ANTIQUITY_QUALITY_GOLD || lead.quality === ANTIQUITY_QUALITY_ORANGE
}

function isLeadLeftToDig(this: void, lead: ActiveAntiquityLead): boolean {
  return lead.loreRemaining > 0 || isMotifAntiquity(lead.name) || isLegendaryLead(lead)
}

const ANTIQUITY_LEAD_OF_CARD: Record<string, (this: void, lead: ActiveAntiquityLead) => boolean> = {
  "antiquity-leads": isLeadLeftToDig,
}

export function antiquityLeadOfCard(
  cardId: string | undefined
): ((this: void, lead: ActiveAntiquityLead) => boolean) | undefined {
  if (cardId === undefined) return undefined
  return ANTIQUITY_LEAD_OF_CARD[cardId]
}

export function hasNoAntiquityOutstanding(
  isLeftToDig: (this: void, lead: ActiveAntiquityLead) => boolean
): boolean {
  return collectOutstandingAntiquities(isLeftToDig).length === 0
}
