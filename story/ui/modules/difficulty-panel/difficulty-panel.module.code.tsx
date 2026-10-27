"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { failureCeiling } from "akasha/story/world/stories/played/difficulty-levels/properties/failure-ceiling.standard-agent-english-property.ts"
import { oddsModifier } from "akasha/story/world/stories/played/difficulty-levels/properties/odds-modifier.number-property.ts"
import { levelUnnamed } from "akasha/story/world/stories/played/modules/difficulty-unnamed/difficulty-unnamed.module.code.ts"
import { difficulty } from "akasha/story/world/stories/played/properties/difficulty.relation-property.ts"
import { useCallback, useEffect, useState } from "react"

const SLUG = "slug"

const TITLE = "title"

const MODIFIER = exportedAs(oddsModifier.propertySlug)

const CEILING = exportedAs(failureCeiling.propertySlug)

const NAMED = exportedAs(difficulty.propertySlug)

const PANEL = "flex flex-col gap-2 rounded-xl p-4 shadow-sm"

const HEADING = "text-secondary text-sm"

const NOTE = "font-mono text-[12px] text-tertiary"

const ERROR_LINE = "font-mono text-[12px] text-red"

const NO_ADDRESS = "This story answers no address, so no level can be read or chosen."

const KEPT = "Holds from the next turn."

export type Level = { readonly address: string; readonly title: string; readonly ceiling: string }

type Held =
  | { readonly levels: readonly Level[]; readonly chosen: string | null }
  | { readonly refused: string }

export function levelsIn(rows: readonly Row[]): readonly Level[] {
  const held: { readonly level: Level; readonly by: number }[] = []
  for (const row of rows) {
    const slug = row[SLUG]
    const title = row[TITLE]
    const by = row[MODIFIER]
    const ceiling = row[CEILING]
    if (typeof slug !== "string" || typeof title !== "string") continue
    if (typeof by !== "number" || typeof ceiling !== "string") continue
    held.push({ level: { address: namedAs(difficultyLevel.slug, slug, null), title, ceiling }, by })
  }
  return held.toSorted((one, other) => other.by - one.by).map((one) => one.level)
}

export function chosenIn(rows: readonly Row[]): string | null {
  const named = rows[0]?.[NAMED]
  return typeof named === "string" ? named : levelUnnamed()
}

async function heldFor(storyAddress: string): Promise<Held> {
  const address = addressIn(storyAddress)
  if (address.kind !== "qualified") return { refused: NO_ADDRESS }
  const [levels, story] = await Promise.all([
    askingFor({ pageTypeSlug: difficultyLevel.slug, keys: [SLUG, TITLE, MODIFIER, CEILING] }),
    askingFor({
      pageTypeSlug: address.pageTypeSlug,
      where: { [SLUG]: { is: address.slug } },
      keys: [NAMED],
    }),
  ])
  if ("refused" in levels) return levels
  if ("refused" in story) return story
  return { levels: levelsIn(levels.rows), chosen: chosenIn(story.rows) }
}

export async function levelKept(storyAddress: string, level: string): Promise<string | null> {
  const address = addressIn(storyAddress)
  if (address.kind !== "qualified") return NO_ADDRESS
  try {
    await patchPage({
      pageTypeSlug: address.pageTypeSlug,
      where: [{ key: SLUG, eq: address.slug }],
      set: { [NAMED]: level },
    })
    return null
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

export function DifficultyPanel({ storyAddress }: { readonly storyAddress: string }) {
  const [levels, setLevels] = useState<readonly Level[]>([])
  const [chosen, setChosen] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [kept, setKept] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    void heldFor(storyAddress).then((held) => {
      if (!live) return
      if ("refused" in held) {
        setError(held.refused)
        return
      }
      setLevels(held.levels)
      setChosen(held.chosen)
    })
    return () => {
      live = false
    }
  }, [storyAddress])

  const choose = useCallback(
    async (level: string) => {
      const was = chosen
      setChosen(level)
      setSaving(true)
      setKept(false)
      setError(null)
      const refused = await levelKept(storyAddress, level)
      if (refused === null) setKept(true)
      else {
        setChosen(was)
        setError(refused)
      }
      setSaving(false)
    },
    [chosen, storyAddress]
  )

  const shown = levels.find((one) => one.address === chosen)

  return (
    <SurfaceProvider level={1} className={PANEL}>
      <p className={HEADING}>Difficulty</p>
      <Select
        value={chosen ?? ""}
        onValueChange={(level) => void choose(level)}
        disabled={saving || levels.length === 0}
      >
        <SelectTrigger aria-label="Difficulty" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {levels.map((one) => (
            <SelectItem key={one.address} value={one.address}>
              {one.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {shown === undefined ? null : <p className={NOTE}>{shown.ceiling}</p>}
      {error === null ? null : <p className={ERROR_LINE}>{error}</p>}
      {kept && error === null ? <p className={NOTE}>{KEPT}</p> : null}
    </SurfaceProvider>
  )
}
