"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { cover } from "akasha/page/properties/cover.relation-property.ts"
import { coverSource } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  namedShapeDescriptor,
  type ShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { ZoomableCover } from "akasha/story/ui/modules/cover-viewing/cover-viewing.module.code.tsx"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type ReactNode, useMemo, useState } from "react"

const ID_KEY = "id"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const ONE = 1

const DRAWN_WIDTH = 268

const DENSITY = 2

export const COVER_WIDTH_ASKED = DRAWN_WIDTH * DENSITY

export const CHARACTER_TYPES: readonly string[] = [characterPlayer.slug, characterOther.slug]

export type Character = { readonly pageTypeSlug: string; readonly slug: string }

export type CharacterCover = {
  readonly slug: string
  readonly name: string
  readonly source: string
  readonly whole: string
}

export function latestTurnId(turns: readonly ClientStoryTurn[]): string | null {
  return turns.at(-1)?.id ?? null
}

export function charactersIn(value: unknown): readonly Character[] {
  if (!Array.isArray(value)) return []
  const held: Character[] = []
  for (const one of value) {
    if (typeof one !== "string") continue
    const address = addressIn(one)
    if (address.kind !== "qualified" || address.slug === "") continue
    if (!CHARACTER_TYPES.includes(address.pageTypeSlug)) continue
    const known = held.some(
      (had) => had.pageTypeSlug === address.pageTypeSlug && had.slug === address.slug
    )
    if (!known) held.push({ pageTypeSlug: address.pageTypeSlug, slug: address.slug })
  }
  return held
}

export function slugsOf(named: readonly Character[], pageTypeSlug: string): readonly string[] {
  return named.filter((one) => one.pageTypeSlug === pageTypeSlug).map((one) => one.slug)
}

function nameOf(row: Page, slug: string): string {
  const title = row[TITLE_KEY]
  return typeof title === "string" && title !== "" ? title : titledAs(slug)
}

export function characterCoversOf(
  named: readonly Character[],
  rowsByType: ReadonlyMap<string, readonly Page[]>
): readonly CharacterCover[] {
  const held: CharacterCover[] = []
  for (const one of named) {
    const row = rowsByType.get(one.pageTypeSlug)?.find((each) => each.slug === one.slug)
    if (row === undefined) continue
    const source = coverSource(row[cover.propertySlug], COVER_WIDTH_ASKED)
    const whole = coverSource(row[cover.propertySlug])
    if (source === null || whole === null) continue
    held.push({ slug: one.slug, name: nameOf(row, one.slug), source, whole })
  }
  return held
}

function inList(keyed: string): readonly string[] {
  return keyed === "" ? [] : keyed.split(" ")
}

function keyedOf(named: readonly Character[]): string {
  return named.map((one) => `${one.pageTypeSlug}/${one.slug}`).join(" ")
}

function namedOf(keyed: string): readonly Character[] {
  return inList(keyed).map((one) => {
    const at = one.indexOf("/")
    return { pageTypeSlug: one.slice(0, at), slug: one.slice(at + 1) }
  })
}

function shapeNamed(
  pageTypeSlug: string,
  by: "id" | "slug",
  values: readonly string[]
): ShapeDescriptor {
  return namedShapeDescriptor(pageTypeSlug, { by, values: [...values] })
}

export function othersOf(named: readonly Character[]): readonly Character[] {
  return named.filter((one) => one.pageTypeSlug === characterOther.slug)
}

export function OtherCharactersPanel({
  turns,
  pageTypeSlug = storyTurnPlayed.slug,
}: {
  readonly turns: readonly ClientStoryTurn[]
  readonly pageTypeSlug?: string | undefined
}) {
  const turnId = latestTurnId(turns)
  if (turnId === null) return null
  return <TurnCharacters turnId={turnId} pageTypeSlug={pageTypeSlug} />
}

function TurnCharacters({ turnId, pageTypeSlug }: { turnId: string; pageTypeSlug: string }) {
  const turnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug,
      where: [{ key: ID_KEY, in: [turnId] }],
      limit: ONE,
      shape: shapeNamed(pageTypeSlug, ID_KEY, [turnId]),
    }),
    [turnId, pageTypeSlug]
  )
  const rows = usePages(turnOptions).rows
  const turn = rows.find((row) => row[ID_KEY] === turnId)
  const keyed = keyedOf(othersOf(charactersIn(turn?.[characters.propertySlug])))
  if (keyed === "") return null
  return <TypeRows keyed={keyed} at={0} read={[]} />
}

type Read = readonly (readonly [string, readonly Page[]])[]

type Drawing = {
  readonly keyed: string
  readonly at: number
  readonly read: Read
}

function TypeRows({ keyed, at, read }: Drawing) {
  const pageTypeSlug = CHARACTER_TYPES[at]
  if (pageTypeSlug === undefined) return <Covers keyed={keyed} read={read} />
  const slugs = slugsOf(namedOf(keyed), pageTypeSlug)
  if (slugs.length === 0) {
    return <TypeRows keyed={keyed} at={at + 1} read={read} />
  }
  return <TypeRowsRead keyed={keyed} at={at} read={read} slugKeyed={slugs.join(" ")} />
}

function TypeRowsRead({ keyed, at, read, slugKeyed }: Drawing & { slugKeyed: string }) {
  const pageTypeSlug = CHARACTER_TYPES[at] ?? ""
  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug,
      where: [{ key: SLUG_KEY, in: inList(slugKeyed) }],
      shape: shapeNamed(pageTypeSlug, SLUG_KEY, inList(slugKeyed)),
    }),
    [pageTypeSlug, slugKeyed]
  )
  const rows = usePages(options).rows
  return <TypeRows keyed={keyed} at={at + 1} read={[...read, [pageTypeSlug, rows]]} />
}

function Figure({ one }: { one: CharacterCover }) {
  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="font-mono font-semibold text-primary text-sm">{one.name}</figcaption>
      <ZoomableCover name={one.name} source={one.source} whole={one.whole} />
    </figure>
  )
}

export function characterShownAt(covers: readonly CharacterCover[], picked: string | null): number {
  const at = picked === null ? -1 : covers.findIndex((one) => one.slug === picked)
  return at === -1 ? 0 : at
}

export type CharacterStep = "earlier" | "later"

export function characterSteppedTo(
  covers: readonly CharacterCover[],
  at: number,
  step: CharacterStep
): CharacterCover | undefined {
  return covers[step === "earlier" ? at - ONE : at + ONE]
}

type CharacterStepButton = {
  readonly step: CharacterStep
  readonly label: string
  readonly icon: ReactNode
}

const EARLIER: CharacterStepButton = {
  step: "earlier",
  label: "Earlier character",
  icon: <ChevronLeft aria-hidden />,
}

const LATER: CharacterStepButton = {
  step: "later",
  label: "Later character",
  icon: <ChevronRight aria-hidden />,
}

function Covers({ keyed, read }: { keyed: string; read: Read }) {
  const [picked, setPicked] = useState<string | null>(null)
  const covers = characterCoversOf(namedOf(keyed), new Map(read))
  const at = characterShownAt(covers, picked)
  const shown = covers[at]
  if (shown === undefined) return null
  const stepped = ({ step, label, icon }: CharacterStepButton) => {
    const to = characterSteppedTo(covers, at, step)
    return (
      <Button
        variant="secondary"
        size="icon-sm"
        aria-label={label}
        disabled={to === undefined}
        onClick={() => {
          if (to !== undefined) setPicked(to.slug)
        }}
      >
        {icon}
      </Button>
    )
  }
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <Figure key={shown.slug} one={shown} />
      {covers.length > ONE ? (
        <div className="flex items-center justify-between">
          {stepped(EARLIER)}
          <span className="font-mono text-[12px] text-secondary">
            {at + ONE} of {covers.length}
          </span>
          {stepped(LATER)}
        </div>
      ) : null}
    </SurfaceProvider>
  )
}
