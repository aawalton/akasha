"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Shown } from "akasha/story/ui/played-panel/modules/panel-loading/panel-loading.module.code.ts"

import { character } from "akasha/story/ui/played-panel/panel-place/pages/character.panel-place.ts"
import { chat } from "akasha/story/ui/played-panel/panel-place/pages/chat.panel-place.ts"
import { journal } from "akasha/story/ui/played-panel/panel-place/pages/journal.panel-place.ts"
import { map } from "akasha/story/ui/played-panel/panel-place/pages/map.panel-place.ts"
import { panelPlace } from "akasha/story/ui/played-panel/panel-place/panel-place.page-type.ts"
import {
  PlaceHead,
  SidebarColumn,
  storedWidths,
  storeWidths,
  TURNS_AT_LEAST,
  WIDTHS,
  type Widths,
  widthClamped,
} from "akasha/story/world/stories/played/modules/played-sidebar-column/played-sidebar-column.module.code.tsx"
import { BookOpen, type LucideIcon, Map as MapIcon, MessageCircle, User } from "lucide-react"
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { flushSync } from "react-dom"

export type Side = "left" | "right"

type Look = {
  readonly slug: string
  readonly label: string
  readonly icon: LucideIcon
  readonly side: Side
}

const LOOKS: readonly Look[] = [
  { slug: character.slug, label: "Character", icon: User, side: "left" },
  { slug: journal.slug, label: "Journal", icon: BookOpen, side: "left" },
  { slug: map.slug, label: "Map", icon: MapIcon, side: "right" },
  { slug: chat.slug, label: "Chat", icon: MessageCircle, side: "right" },
]

export type Sides = {
  readonly left: string | null
  readonly right: string | null
}

export type Open = Sides & {
  readonly last: Side
}

export const CLOSED: Open = { left: null, right: null, last: "left" }

export const BOTH = 2

export const ONE = 1

export const NONE = 0

const STORED_AT = "played-sidebars"

const PHONE = "(max-width: 583px)"

const ROOT = "flex w-full flex-col"

const TOP_BAR =
  "sticky top-(--safe-area-top) z-20 flex h-12 items-center justify-between gap-2 border-primary/10 border-b px-4"

const BAR_GROUP = "flex items-center gap-1"

const ROW = "flex w-full items-start"

const CENTER = "flex min-w-0 flex-1 flex-col"

const BODY = "flex w-full px-6 pt-3 pb-12 min-[584px]:pt-6"

const BAR_HELD = "z-10 pt-2 pb-4 min-[584px]:sticky min-[584px]:bottom-0"

const TURNS = "mx-auto flex w-full min-w-0 max-w-[772px] flex-1 flex-col gap-6"

const TURNS_TEXT = "flex min-w-0 flex-col gap-6"

const SET_ASIDE = "hidden"

const PLACE_COLUMN = "flex flex-col gap-4"

const TAB_BAR =
  "fixed inset-x-0 bottom-0 z-30 flex border-primary/10 border-t pb-(--safe-area-bottom)"

const TAB = "flex h-14 flex-1 flex-col items-center justify-center gap-1 text-[11px]"

const TAB_ON = "text-accent"

const TAB_OFF = "text-tertiary"

const TAB_BAR_ROOM = "h-[calc(3.5rem+var(--safe-area-bottom))] shrink-0"

const PHONE_PLACE =
  "fixed inset-x-0 top-0 bottom-[calc(3.5rem+var(--safe-area-bottom))] z-30 flex flex-col overflow-y-auto overscroll-contain pt-(--safe-area-top)"

const PHONE_PLACE_HEAD = "sticky top-0 z-10"

const PHONE_PLACE_BODY = "flex flex-col gap-4 p-4"

export function placedFrom(
  shown: readonly Shown[],
  draw: (drawn: readonly Shown[]) => ReactNode
): ReadonlyMap<string, ReactNode> {
  const placed = new Map<string, ReactNode>()
  for (const look of LOOKS) {
    const at = namedAs(panelPlace.slug, look.slug, null)
    const drawn = shown.filter((one) => one.place === at)
    if (drawn.length > NONE) placed.set(look.slug, draw(drawn))
  }
  return placed
}

export function sidebarsFitting(width: number, widths: Widths = WIDTHS): number {
  if (width - widths.left - widths.right >= TURNS_AT_LEAST) return BOTH
  if (width - Math.max(widths.left, widths.right) >= TURNS_AT_LEAST) return ONE
  return NONE
}

function otherSide(side: Side): Side {
  return side === "left" ? "right" : "left"
}

function withSide(open: Open, side: Side, slug: string | null): Open {
  return side === "left" ? { ...open, left: slug } : { ...open, right: slug }
}

export function shownOf(open: Open, placed: ReadonlySet<string>, fitting: number): Sides {
  const left = open.left !== null && placed.has(open.left) ? open.left : null
  const right = open.right !== null && placed.has(open.right) ? open.right : null
  if (fitting >= BOTH || left === null || right === null) return { left, right }
  return open.last === "left" ? { left, right: null } : { left: null, right }
}

export function toggled(
  open: Open,
  slug: string,
  side: Side,
  placed: ReadonlySet<string>,
  fitting: number
): Open {
  if (shownOf(open, placed, fitting)[side] === slug) return withSide(open, side, null)
  const chosen = { ...withSide(open, side, slug), last: side }
  return fitting >= BOTH ? chosen : withSide(chosen, otherSide(side), null)
}

function slugAt(held: object, key: string): string | null {
  const value: unknown = Reflect.get(held, key)
  return typeof value === "string" ? value : null
}

function storedOpen(): Open {
  try {
    const held: unknown = JSON.parse(localStorage.getItem(STORED_AT) ?? "null")
    if (typeof held !== "object" || held === null) return CLOSED
    return {
      left: slugAt(held, "left"),
      right: slugAt(held, "right"),
      last: slugAt(held, "last") === "right" ? "right" : "left",
    }
  } catch {
    return CLOSED
  }
}

function storeOpen(open: Open): undefined {
  localStorage.setItem(STORED_AT, JSON.stringify(open))
}

function subscribePhone(callback: () => void): () => void {
  const query = window.matchMedia(PHONE)
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

function phoneNow(): boolean {
  return window.matchMedia(PHONE).matches
}

function phoneOnServer(): boolean {
  return false
}

function useWidth(): readonly [(at: HTMLElement | null) => void, number] {
  const [at, setAt] = useState<HTMLElement | null>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    if (at === null) return
    const judge = () => setWidth(at.clientWidth)
    judge()
    const watch = new ResizeObserver(judge)
    watch.observe(at)
    return () => watch.disconnect()
  }, [at])
  return [setAt, width]
}

function PlaceButton({ look, on, onPress }: { look: Look; on: boolean; onPress: () => void }) {
  const Icon = look.icon
  return (
    <Button
      type="button"
      size="sm"
      variant={on ? "accent" : "tertiary"}
      aria-pressed={on}
      onClick={onPress}
    >
      <Icon />
      {look.label}
    </Button>
  )
}

function PlaceTab({ look, on, onPress }: { look: Look; on: boolean; onPress: () => void }) {
  const Icon = look.icon
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onPress}
      className={cn(TAB, on ? TAB_ON : TAB_OFF)}
    >
      <Icon className="size-5" />
      {look.label}
    </button>
  )
}

function PhonePlace({
  look,
  beside,
  drawn,
  onSwitch,
  onClose,
}: {
  look: Look
  beside: readonly Look[]
  drawn: ReactNode
  onSwitch: (slug: string) => void
  onClose: () => void
}) {
  return (
    <div className={cn(PHONE_PLACE, surfaceClass(0))}>
      <PlaceHead
        chosen={look}
        beside={beside}
        onSwitch={onSwitch}
        onClose={onClose}
        className={cn(PHONE_PLACE_HEAD, surfaceClass(0))}
      />
      <div className={PHONE_PLACE_BODY}>{drawn}</div>
    </div>
  )
}

export function PlayedSidebars({
  head,
  panelsAbove,
  runDrawn,
  bar,
  placed,
}: {
  head: ReactNode
  panelsAbove: ReactNode
  runDrawn: ReactNode
  bar?: ReactNode
  placed: ReadonlyMap<string, ReactNode>
}) {
  const [rootAt, width] = useWidth()
  const phone = useSyncExternalStore(subscribePhone, phoneNow, phoneOnServer)
  const [open, setOpen] = useState<Open>(CLOSED)
  const [widths, setWidths] = useState<Widths>(WIDTHS)
  const textAt = useRef(0)
  const restored = useRef(false)
  const looks = LOOKS.filter((look) => placed.has(look.slug))
  const slugs: ReadonlySet<string> = new Set(looks.map((look) => look.slug))
  const fitting = phone ? NONE : sidebarsFitting(width, widths)
  const shown = shownOf(open, slugs, fitting)
  const covered = fitting === NONE ? (shown.left ?? shown.right) : null
  const coverLook = looks.find((look) => look.slug === covered)

  useEffect(() => {
    if (restored.current || width === NONE) return
    restored.current = true
    const kept = storedWidths()
    setWidths(kept)
    if (!phone && sidebarsFitting(width, kept) > NONE) setOpen(storedOpen())
  }, [width, phone])

  useEffect(() => {
    if (covered === null) return
    document.documentElement.dataset.panelsShown = ""
    return () => {
      delete document.documentElement.dataset.panelsShown
    }
  }, [covered])

  const choose = (next: Open) => {
    if (fitting > NONE) storeOpen(next)
    const nextShown = shownOf(next, slugs, fitting)
    const willCover = fitting === NONE && (nextShown.left ?? nextShown.right) !== null
    if (phone || willCover === (covered !== null)) {
      setOpen(next)
      return
    }
    if (willCover) {
      textAt.current = window.scrollY
      flushSync(() => setOpen(next))
      window.scrollTo(0, 0)
      return
    }
    flushSync(() => setOpen(next))
    window.scrollTo(0, textAt.current)
  }
  const press = (look: Look) => choose(toggled(open, look.slug, look.side, slugs, fitting))
  const isOn = (look: Look) => shown[look.side] === look.slug
  const switchTo = (side: Side) => (slug: string) =>
    choose(toggled(open, slug, side, slugs, fitting))
  const resize = (side: Side, wanted: number) => {
    const beside = shown[otherSide(side)] === null ? NONE : widths[otherSide(side)]
    const kept = widthClamped(wanted, width, beside)
    const next = side === "left" ? { ...widths, left: kept } : { ...widths, right: kept }
    setWidths(next)
    storeWidths(next)
  }
  const sidebar = (side: Side) => {
    const look = looks.find((one) => one.slug === shown[side])
    if (fitting === NONE || look === undefined) return null
    return (
      <SidebarColumn
        side={side}
        width={widths[side]}
        onWidth={(wanted) => resize(side, wanted)}
        held={{
          chosen: look,
          beside: looks.filter((one) => one.side === side),
          onSwitch: switchTo(side),
          onClose: () => choose(withSide(open, side, null)),
        }}
      >
        {placed.get(look.slug)}
      </SidebarColumn>
    )
  }

  return (
    <div ref={rootAt} className={ROOT}>
      <div className={ROW}>
        {sidebar("left")}
        <div className={CENTER}>
          {phone || looks.length === NONE ? null : (
            <div className={cn(TOP_BAR, surfaceClass(0))}>
              {(["left", "right"] as const).map((side) => (
                <div key={side} className={BAR_GROUP}>
                  {looks
                    .filter((look) => look.side === side)
                    .map((look) => (
                      <PlaceButton
                        key={look.slug}
                        look={look}
                        on={isOn(look)}
                        onPress={() => press(look)}
                      />
                    ))}
                </div>
              ))}
            </div>
          )}
          <div className={BODY}>
            <div className={TURNS}>
              {phone || covered === null ? null : (
                <div className={PLACE_COLUMN}>{placed.get(covered)}</div>
              )}
              <div className={!phone && covered !== null ? SET_ASIDE : TURNS_TEXT}>
                {head}
                {panelsAbove}
                {runDrawn}
              </div>
              {bar == null ? null : <div className={cn(BAR_HELD, surfaceClass(0))}>{bar}</div>}
            </div>
          </div>
        </div>
        {sidebar("right")}
      </div>
      {phone && looks.length > NONE ? <div className={TAB_BAR_ROOM} /> : null}
      {phone && coverLook !== undefined ? (
        <PhonePlace
          look={coverLook}
          beside={looks.filter((look) => look.side === coverLook.side)}
          drawn={placed.get(coverLook.slug)}
          onSwitch={switchTo(coverLook.side)}
          onClose={() => choose(withSide(open, coverLook.side, null))}
        />
      ) : null}
      {phone && looks.length > NONE ? (
        <nav className={cn(TAB_BAR, surfaceClass(0))}>
          {looks.map((look) => (
            <PlaceTab key={look.slug} look={look} on={isOn(look)} onPress={() => press(look)} />
          ))}
        </nav>
      ) : null}
    </div>
  )
}
