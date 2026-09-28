"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { cover } from "akasha/page/properties/cover.relation-property.ts"
import {
  coverSource,
  PageCover,
} from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  namedShapeDescriptor,
  type ShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
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
    if (source === null) continue
    held.push({ slug: one.slug, name: nameOf(row, one.slug), source })
  }
  return held
}

export function turnCoverSource(turn: Page | undefined): string | null {
  return coverSource(turn?.[cover.propertySlug], COVER_WIDTH_ASKED)
}

export function turnCoverAt(covers: readonly CharacterCover[], players: readonly string[]): number {
  return covers.findLastIndex((one) => players.includes(one.slug)) + 1
}

export type TurnCover = { readonly id: string; readonly number: number; readonly source: string }

export function turnCoversOf(
  turns: readonly ClientStoryTurn[],
  rows: readonly Page[]
): readonly TurnCover[] {
  const held: TurnCover[] = []
  for (const [index, one] of turns.entries()) {
    const source = turnCoverSource(rows.find((row) => row[ID_KEY] === one.id))
    if (source !== null) held.push({ id: one.id, number: one.turnNumber ?? index + 1, source })
  }
  return held
}

export type Paged = { readonly from: string; readonly to: string }

export function pickedFor(paged: Paged | null, latest: string): string | null {
  return paged !== null && paged.from === latest ? paged.to : null
}

export function pagedAt(covers: readonly TurnCover[], picked: string | null): number {
  const at = picked === null ? -1 : covers.findIndex((one) => one.id === picked)
  return at === -1 ? covers.length - 1 : at
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

export function CharacterCoverPanel({ turns }: { turns: readonly ClientStoryTurn[] }) {
  const turnId = latestTurnId(turns)
  if (turnId === null) return null
  return <TurnCovers turnId={turnId} turns={turns} />
}

function TurnCovers({ turnId, turns }: { turnId: string; turns: readonly ClientStoryTurn[] }) {
  const idsKeyed = turns.map((one) => one.id).join(" ")
  const turnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: storyTurnPlayed.slug,
      where: [{ key: ID_KEY, in: inList(idsKeyed) }],
      limit: Math.max(ONE, inList(idsKeyed).length),
      shape: shapeNamed(storyTurnPlayed.slug, ID_KEY, inList(idsKeyed)),
    }),
    [idsKeyed]
  )
  const rows = usePages(turnOptions).rows
  const [paged, setPaged] = useState<Paged | null>(null)
  const turn = rows.find((row) => row[ID_KEY] === turnId)
  const keyed = keyedOf(charactersIn(turn?.[characters.propertySlug]))
  const covers = turnCoversOf(turns, rows)
  if (keyed === "" && covers.length === 0) return null
  const picture =
    covers.length === 0 ? null : (
      <TurnPicture
        covers={covers}
        at={pagedAt(covers, pickedFor(paged, turnId))}
        onPick={(to) => setPaged({ from: turnId, to })}
      />
    )
  return <TypeRows keyed={keyed} at={0} read={[]} picture={picture} />
}

function TurnPicture({
  covers,
  at,
  onPick,
}: {
  covers: readonly TurnCover[]
  at: number
  onPick: (id: string) => void
}) {
  const shown = covers[at]
  if (shown === undefined) return null
  const earlier = covers[at - 1]
  const later = covers[at + 1]
  return (
    <figure className="flex flex-col gap-2">
      <PageCover coverUrl={shown.source} />
      {covers.length > ONE ? (
        <figcaption className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Earlier turn"
            disabled={earlier === undefined}
            onClick={() => {
              if (earlier !== undefined) onPick(earlier.id)
            }}
          >
            <ChevronLeft aria-hidden />
          </Button>
          <span className="font-mono text-[12px] text-secondary">Turn {shown.number}</span>
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Later turn"
            disabled={later === undefined}
            onClick={() => {
              if (later !== undefined) onPick(later.id)
            }}
          >
            <ChevronRight aria-hidden />
          </Button>
        </figcaption>
      ) : null}
    </figure>
  )
}

type Read = readonly (readonly [string, readonly Page[]])[]

type Drawing = {
  readonly keyed: string
  readonly at: number
  readonly read: Read
  readonly picture: ReactNode
}

function TypeRows({ keyed, at, read, picture }: Drawing) {
  const pageTypeSlug = CHARACTER_TYPES[at]
  if (pageTypeSlug === undefined) return <Covers keyed={keyed} read={read} picture={picture} />
  const slugs = slugsOf(namedOf(keyed), pageTypeSlug)
  if (slugs.length === 0) {
    return <TypeRows keyed={keyed} at={at + 1} read={read} picture={picture} />
  }
  return (
    <TypeRowsRead keyed={keyed} at={at} read={read} picture={picture} slugKeyed={slugs.join(" ")} />
  )
}

function TypeRowsRead({ keyed, at, read, picture, slugKeyed }: Drawing & { slugKeyed: string }) {
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
  return (
    <TypeRows keyed={keyed} at={at + 1} read={[...read, [pageTypeSlug, rows]]} picture={picture} />
  )
}

function Figure({ one }: { one: CharacterCover }) {
  return (
    <figure className="flex flex-col gap-2">
      <PageCover coverUrl={one.source} />
      <figcaption className="font-mono text-[12px] text-secondary">{one.name}</figcaption>
    </figure>
  )
}

function Covers({ keyed, read, picture }: { keyed: string; read: Read; picture: ReactNode }) {
  const named = namedOf(keyed)
  const covers = characterCoversOf(named, new Map(read))
  if (covers.length === 0 && picture === null) return null
  const at = turnCoverAt(covers, slugsOf(named, characterPlayer.slug))
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      {covers.slice(0, at).map((one) => (
        <Figure key={one.slug} one={one} />
      ))}
      {picture}
      {covers.slice(at).map((one) => (
        <Figure key={one.slug} one={one} />
      ))}
    </SurfaceProvider>
  )
}
