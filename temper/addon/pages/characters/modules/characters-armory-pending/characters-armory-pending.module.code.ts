import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import { deleteRecordKey } from "akasha/code/type/narrowing/modules/delete-record-key/delete-record-key.module.code.ts"
import type { CharacterTarget } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import {
  getSavedVariables,
  type PendingBuildEdit,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

export interface ArmoryBuild {
  readonly key: string
  readonly buildId?: string
  readonly madeIn?: string
  readonly title: string
  readonly icon: number
  readonly target: CharacterTarget
}

export interface BuildChange {
  readonly title?: string
  readonly icon?: number
  readonly buildHash?: string
  readonly view?: CharacterTarget
}

type PendingEntry = readonly [string, PendingBuildEdit]

const HEX = "0123456789abcdef"

function hexAt(at: number): string {
  return HEX.substring(at, at + 1)
}

function hexDigits(count: number): string {
  let digits = ""
  for (let at = 0; at < count; at++) digits += hexAt(Math.floor(Math.random() * 16))
  return digits
}

export function mintEditId(): string {
  const variant = hexAt(8 + Math.floor(Math.random() * 4))
  return `${hexDigits(8)}-${hexDigits(4)}-4${hexDigits(3)}-${variant}${hexDigits(3)}-${hexDigits(12)}`
}

function pendingTable(): Record<string, PendingBuildEdit> {
  const sv = getSavedVariables()
  const table = sv.buildEdits ?? {}
  sv.buildEdits = table
  return table
}

function pendingHere(): PendingEntry[] {
  const characterId = GetCurrentCharacterId()
  return Object.entries(pendingTable())
    .filter(([, edit]) => edit.characterId === characterId)
    .sort(([, one], [, other]) => one.order - other.order)
}

function nextOrder(): number {
  let top = 0
  for (const [, edit] of Object.entries(pendingTable())) top = Math.max(top, edit.order)
  return top + 1
}

interface BuildRef {
  readonly buildId?: string
  readonly correlationId?: string
}

function isOf(build: BuildRef, [id, edit]: PendingEntry): boolean {
  if (build.buildId !== undefined && edit.buildId === build.buildId) return true
  const made = build.correlationId
  return made !== undefined && (id === made || edit.madeIn === made)
}

function chainOf(build: BuildRef, entries: readonly PendingEntry[]): PendingEntry[] {
  return entries.filter((entry) => isOf(build, entry))
}

function refOf(build: ArmoryBuild): BuildRef {
  if (build.buildId !== undefined) {
    const made = build.target.correlationId
    return made === undefined
      ? { buildId: build.buildId }
      : { buildId: build.buildId, correlationId: made }
  }
  return build.madeIn === undefined ? {} : { correlationId: build.madeIn }
}

export function recordEdit(build: ArmoryBuild, change: BuildChange): undefined {
  const last = chainOf(refOf(build), pendingHere()).pop()
  const placed =
    build.buildId !== undefined
      ? { buildId: build.buildId, basedOn: build.target.updatedAt }
      : build.madeIn !== undefined
        ? { madeIn: build.madeIn }
        : {}
  pendingTable()[mintEditId()] = {
    characterId: GetCurrentCharacterId(),
    order: nextOrder(),
    ...(last === undefined ? {} : { after: last[0] }),
    ...placed,
    ...change,
  }
  return undefined
}

export function recordNew(change: BuildChange): string {
  const id = mintEditId()
  pendingTable()[id] = { characterId: GetCurrentCharacterId(), order: nextOrder(), ...change }
  return id
}

function overlaid(
  key: string,
  base: CharacterTarget,
  chain: readonly PendingEntry[],
  placed: { readonly buildId?: string; readonly madeIn?: string }
): ArmoryBuild {
  let title = base.title
  let icon = base.icon
  let target = base
  for (const [, edit] of chain) {
    if (edit.title !== undefined) title = edit.title
    if (edit.icon !== undefined) icon = edit.icon
    if (edit.view !== undefined) target = edit.view
  }
  return { key, ...placed, title, icon, target }
}

export function armoryBuilds(targets: readonly CharacterTarget[]): readonly ArmoryBuild[] {
  const entries = pendingHere()
  const builds = targets.map((target) =>
    overlaid(target.buildId, target, chainOf(target, entries), { buildId: target.buildId })
  )
  for (const [id, edit] of entries) {
    if (edit.buildId !== undefined || edit.madeIn !== undefined || edit.view === undefined) continue
    if (targets.some((target) => target.correlationId === id)) continue
    const chain = chainOf({ correlationId: id }, entries)
    builds.push(overlaid(id, edit.view, chain, { madeIn: id }))
  }
  return builds
}

function targetFor(
  [id, edit]: PendingEntry,
  targets: readonly CharacterTarget[]
): CharacterTarget | undefined {
  if (edit.buildId !== undefined) return targets.find((one) => one.buildId === edit.buildId)
  const made = edit.madeIn ?? id
  return targets.find((one) => one.correlationId === made)
}

function dropThrough(chain: readonly PendingEntry[], order: number): undefined {
  const table = pendingTable()
  for (const [id, edit] of chain) if (edit.order <= order) deleteRecordKey(table, id)
  return undefined
}

function settleOne(
  entry: PendingEntry,
  targets: readonly CharacterTarget[],
  said: (text: string) => undefined
): undefined {
  const [id, edit] = entry
  const table = pendingTable()
  if (table[id] === undefined) return undefined
  const target = targetFor(entry, targets)
  if (target === undefined) {
    const orphan = edit.madeIn !== undefined && table[edit.madeIn] === undefined
    if (edit.buildId !== undefined || orphan) deleteRecordKey(table, id)
    return undefined
  }
  const chain = chainOf(target, pendingHere())
  const made = edit.buildId === undefined && edit.madeIn === undefined
  if (made || target.editId === id) return dropThrough(chain, edit.order)
  const landedBy = target.editId
  const follows =
    landedBy !== undefined &&
    (landedBy === edit.after || chain.some(([chained]) => chained === landedBy))
  if (follows || target.updatedAt === edit.basedOn) return undefined
  deleteRecordKey(table, id)
  return said(
    `Your change to ${edit.title ?? target.title} in the game was not kept: it was changed on alanwalton.com first.`
  )
}

export function settlePending(
  targets: readonly CharacterTarget[],
  said: (text: string) => undefined
): undefined {
  for (const entry of pendingHere()) settleOne(entry, targets, said)
  return undefined
}
