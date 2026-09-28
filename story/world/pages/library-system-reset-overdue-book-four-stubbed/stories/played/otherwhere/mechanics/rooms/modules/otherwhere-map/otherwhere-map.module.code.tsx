"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import { otherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.ts"
import { useMemo } from "react"

const SHOWN_TO_KEY = "shownTo"

const LIT_KEY = "lit"

const TITLE_KEY = "title"

const MAP_PANEL = "flex flex-col gap-3 rounded-xl p-4 shadow-sm"

const MAP_HEAD =
  "flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em]"

const MAP_FLOOR = "flex flex-col gap-1.5"

const ROOM = "flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] leading-tight"

const ROOM_LIT = `${ROOM} border-yellow/40 bg-yellow/10 text-primary`

const ROOM_DARK = `${ROOM} border-dotted border-surface-3 text-tertiary`

const LAMP = "size-1.5 flex-none rounded-full"

const LAMP_LIT = `${LAMP} bg-yellow shadow-[0_0_6px_1px] shadow-yellow/70`

const LAMP_DARK = `${LAMP} bg-surface-3`

export type MapRoom = {
  readonly id: string
  readonly title: string
  readonly lit: boolean
}

function roomOf(row: Page): MapRoom | null {
  const title = row[TITLE_KEY]
  if (typeof title !== "string" || title === "") return null
  return { id: row.id, title, lit: row[LIT_KEY] === true }
}

function litFirst(one: MapRoom, other: MapRoom): number {
  if (one.lit !== other.lit) return one.lit ? -1 : 1
  return one.title.localeCompare(other.title)
}

export function mapRoomsOf(rows: readonly Page[], player: string): readonly MapRoom[] {
  const held: MapRoom[] = []
  for (const row of rows) {
    const shown = row[SHOWN_TO_KEY]
    if (!Array.isArray(shown) || !shown.includes(player)) continue
    const room = roomOf(row)
    if (room !== null) held.push(room)
  }
  return held.sort(litFirst)
}

export function roomsShownTo(player: string): UsePagesSupabaseOptions {
  return {
    pageTypeSlug: otherwhereRoom.slug,
    where: [{ key: SHOWN_TO_KEY, includes: player }],
    shape: namedShapeDescriptor(otherwhereRoom.slug, {
      by: "where",
      key: SHOWN_TO_KEY,
      values: [player],
    }),
  }
}

function RoomTile({ room }: { readonly room: MapRoom }) {
  return (
    <li className={room.lit ? ROOM_LIT : ROOM_DARK}>
      <span aria-hidden className={room.lit ? LAMP_LIT : LAMP_DARK} />
      <span className="min-w-0 flex-1">{room.title}</span>
      <span className="sr-only">{room.lit ? "lit" : "dark"}</span>
    </li>
  )
}

export function OtherwhereMapPanel({ player }: { readonly player: string }) {
  const options = useMemo(() => roomsShownTo(player), [player])
  const found = usePages(options)
  const rooms = useMemo(() => mapRoomsOf(found.rows, player), [found.rows, player])
  if (player === "" || rooms.length === 0) return null
  const lit = rooms.filter((room) => room.lit).length
  return (
    <SurfaceProvider level={1} className={MAP_PANEL}>
      <div className={MAP_HEAD}>
        <span className="text-tertiary">The Library</span>
        <span className="text-secondary">
          {lit} of {rooms.length} lit
        </span>
      </div>
      <ul className={MAP_FLOOR}>
        {rooms.map((room) => (
          <RoomTile key={room.id} room={room} />
        ))}
      </ul>
    </SurfaceProvider>
  )
}
