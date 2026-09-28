"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import { placeExitDirection } from "akasha/story/lore/place/properties/place-exit-direction.select-property.ts"
import type { PlaceExitDirection } from "akasha/story/lore/place/properties/place-exit-direction.select-property.types.ts"
import {
  type MapExit,
  type MapFloor,
  type MapLink,
  type MapRoom,
  mapLayoutOf,
} from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/modules/otherwhere-the-library-map-layout/otherwhere-the-library-map-layout.module.code.ts"
import { otherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.ts"
import { type CSSProperties, useMemo } from "react"

const SHOWN_TO_KEY = "shownTo"

const LIT_KEY = "lit"

const TITLE_KEY = "title"

const SLUG_KEY = "slug"

const DEPTH_KEY = "depth"

const EXITS_KEY = "exits"

const TO_KEY = "to"

const DIRECTION_KEY = "direction"

const DIRECTIONS: readonly string[] = placeExitDirection.values

const MAP_PANEL = "flex flex-col gap-3 rounded-xl p-4 shadow-sm"

const MAP_HEAD =
  "flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em]"

const FLOOR = "flex flex-col gap-1.5"

const FLOOR_NAME = "font-mono text-[9px] uppercase tracking-[0.18em] text-tertiary"

const APART = "flex flex-col gap-1.5"

const ROOM =
  "flex min-h-9 items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[12px] leading-tight"

const ROOM_LIT = `${ROOM} border-yellow/40 bg-yellow/10 text-primary`

const ROOM_DARK = `${ROOM} border-dotted border-surface-3 text-tertiary`

const LAMP = "size-1.5 flex-none rounded-full"

const LAMP_LIT = `${LAMP} bg-yellow shadow-[0_0_6px_1px] shadow-yellow/70`

const LAMP_DARK = `${LAMP} bg-surface-3`

const STAIR = "flex-none font-mono text-[11px] text-secondary"

const LINK_ACROSS = "self-center border-t border-surface-3"

const LINK_ALONG = "justify-self-center border-l border-surface-3"

const UNTOLD = "border-dashed"

const CELL_ACROSS = "minmax(0,1fr)"

const CELL_ALONG = "auto"

const LINK_SIZE = "0.625rem"

const WAY_UNKNOWN = "Way not yet known"

function isDirection(said: unknown): said is PlaceExitDirection {
  return typeof said === "string" && DIRECTIONS.includes(said)
}

function exitsOf(said: unknown): readonly MapExit[] {
  if (!Array.isArray(said)) return []
  const found: MapExit[] = []
  for (const one of said) {
    if (typeof one !== "object" || one === null) continue
    const to: unknown = Reflect.get(one, TO_KEY)
    if (typeof to !== "string" || to === "") continue
    const direction: unknown = Reflect.get(one, DIRECTION_KEY)
    found.push({ to, direction: isDirection(direction) ? direction : null })
  }
  return found
}

function roomOf(row: Page): MapRoom | null {
  const title = row[TITLE_KEY]
  const slug = row[SLUG_KEY]
  if (typeof title !== "string" || title === "" || typeof slug !== "string") return null
  const depth = row[DEPTH_KEY]
  return {
    id: row.id,
    at: `${otherwhereIRoom.slug}/${slug}`,
    title,
    lit: row[LIT_KEY] === true,
    depth: typeof depth === "number" && Number.isFinite(depth) ? depth : null,
    exits: exitsOf(row[EXITS_KEY]),
  }
}

export function mapRoomsOf(rows: readonly Page[], player: string): readonly MapRoom[] {
  const held: MapRoom[] = []
  for (const row of rows) {
    const shown = row[SHOWN_TO_KEY]
    if (!Array.isArray(shown) || !shown.includes(player)) continue
    const room = roomOf(row)
    if (room !== null) held.push(room)
  }
  return held
}

export function roomsShownTo(player: string): UsePagesSupabaseOptions {
  return {
    pageTypeSlug: otherwhereIRoom.slug,
    where: [{ key: SHOWN_TO_KEY, includes: player }],
    shape: namedShapeDescriptor(otherwhereIRoom.slug, {
      by: "where",
      key: SHOWN_TO_KEY,
      values: [player],
    }),
  }
}

function floorName(depth: number | null): string {
  if (depth === null) return "Floor not yet known"
  if (depth === 0) return "Main floor"
  if (depth > 0) return `Floor ${depth + 1}`
  return depth === -1 ? "Basement" : `Basement ${-depth}`
}

function tracks(count: number, cell: string): string {
  const held: string[] = []
  for (let at = 0; at < count * 2 - 1; at += 1) held.push(at % 2 === 0 ? cell : LINK_SIZE)
  return held.join(" ")
}

function cellAt(column: number, row: number): CSSProperties {
  return { gridColumn: column + 1, gridRow: row + 1 }
}

type TileProps = {
  readonly room: MapRoom
  readonly up?: boolean
  readonly down?: boolean
  readonly style?: CSSProperties
}

function RoomTile({ room, up = false, down = false, style }: TileProps) {
  return (
    <li className={room.lit ? ROOM_LIT : ROOM_DARK} style={style}>
      <span aria-hidden className={room.lit ? LAMP_LIT : LAMP_DARK} />
      <span className="min-w-0 flex-1 break-words">{room.title}</span>
      {up ? (
        <span className={STAIR} title="Stairs up">
          <span aria-hidden>↑</span>
          <span className="sr-only">stairs up</span>
        </span>
      ) : null}
      {down ? (
        <span className={STAIR} title="Stairs down">
          <span aria-hidden>↓</span>
          <span className="sr-only">stairs down</span>
        </span>
      ) : null}
      <span className="sr-only">{room.lit ? "lit" : "dark"}</span>
    </li>
  )
}

function LinkLine({ link }: { readonly link: MapLink }) {
  const drawn = link.across ? LINK_ACROSS : LINK_ALONG
  return (
    <li
      aria-hidden
      className={link.told ? drawn : `${drawn} ${UNTOLD}`}
      style={cellAt(link.column, link.row)}
    />
  )
}

type PlanProps = {
  readonly floor: MapFloor
  readonly columns: number
  readonly named: boolean
}

function FloorPlan({ floor, columns, named }: PlanProps) {
  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: tracks(columns, CELL_ACROSS),
    gridTemplateRows: tracks(floor.rows, CELL_ALONG),
  }
  return (
    <section className={FLOOR}>
      {named ? <h3 className={FLOOR_NAME}>{floorName(floor.depth)}</h3> : null}
      <ul style={grid}>
        {floor.links.map((link) => (
          <LinkLine key={`${link.column}:${link.row}`} link={link} />
        ))}
        {floor.rooms.map((placed) => (
          <RoomTile
            key={placed.room.id}
            room={placed.room}
            up={placed.up}
            down={placed.down}
            style={cellAt(placed.column * 2, placed.row * 2)}
          />
        ))}
      </ul>
    </section>
  )
}

export function OtherwhereMapPanel({ player }: { readonly player: string }) {
  const options = useMemo(() => roomsShownTo(player), [player])
  const found = usePages(options)
  const rooms = useMemo(() => mapRoomsOf(found.rows, player), [found.rows, player])
  const layout = useMemo(() => mapLayoutOf(rooms), [rooms])
  if (player === "" || rooms.length === 0) return null
  const lit = rooms.filter((room) => room.lit).length
  const named = layout.floors.length > 1
  return (
    <SurfaceProvider level={1} className={MAP_PANEL}>
      <div className={MAP_HEAD}>
        <span className="text-tertiary">The Library</span>
        <span className="text-secondary">
          {lit} of {rooms.length} lit
        </span>
      </div>
      {layout.floors.map((floor) => (
        <FloorPlan
          key={floor.depth ?? "unknown"}
          floor={floor}
          columns={layout.columns}
          named={named}
        />
      ))}
      {layout.apart.length > 0 ? (
        <section className={FLOOR}>
          <h3 className={FLOOR_NAME}>{WAY_UNKNOWN}</h3>
          <ul className={APART}>
            {layout.apart.map((room) => (
              <RoomTile key={room.id} room={room} />
            ))}
          </ul>
        </section>
      ) : null}
    </SurfaceProvider>
  )
}
