import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"

export const SLIDE = "slide"

export const SLIDE_KINDS = ["title", "about", "agenda", "level", "cta"] as const

export type SlideKind = (typeof SLIDE_KINDS)[number]

export const POINT_COLORS = ["red", "yellow", "green", "blue"] as const

export type PointColor = (typeof POINT_COLORS)[number]

export const POINT_ICONS = ["brain", "code", "heart-pulse", "gauge"] as const

export type PointIcon = (typeof POINT_ICONS)[number]

export type DrawnPoint = {
  readonly title: string
  readonly value: string | null
  readonly description: string | null
  readonly color: PointColor | null
  readonly fill: number | null
  readonly icon: PointIcon | null
}

export type DrawnSlide = {
  readonly number: number
  readonly kind: SlideKind
  readonly title: string
  readonly lead: string | null
  readonly points: readonly DrawnPoint[]
  readonly closer: string | null
  readonly image: string | null
  readonly imageCaption: string | null
}

function oneOf<T extends string>(members: readonly T[], value: unknown): T | null {
  return members.find((one) => one === value) ?? null
}

function pointIn(value: unknown): DrawnPoint | null {
  const held = asObjectRecord(value)
  const title = stringIn(held?.title)
  if (held === undefined || title === null) return null
  return {
    title,
    value: stringIn(held.value),
    description: stringIn(held.description),
    color: oneOf(POINT_COLORS, held.color),
    fill: typeof held.fill === "number" ? held.fill : null,
    icon: oneOf(POINT_ICONS, held.icon),
  }
}

export function slideIn(page: Readonly<Record<string, unknown>>): DrawnSlide | null {
  const kind = oneOf(SLIDE_KINDS, page.kind)
  if (kind === null || typeof page.number !== "number") return null
  const listed = Array.isArray(page.points) ? page.points : []
  return {
    number: page.number,
    kind,
    title: stringIn(page.title) ?? stringIn(page.slug) ?? "",
    lead: stringIn(page.lead),
    points: listed.map(pointIn).filter((one) => one !== null),
    closer: stringIn(page.closer),
    image: stringIn(page.image),
    imageCaption: stringIn(page.imageCaption),
  }
}

export function slidesFrom(pages: readonly Readonly<Record<string, unknown>>[]): DrawnSlide[] {
  return pages
    .map(slideIn)
    .filter((one) => one !== null)
    .sort((one, other) => one.number - other.number)
}

export async function slidesOf(deck: string): Promise<DrawnSlide[]> {
  const found = await collectPages({ pageTypeSlug: SLIDE, where: [{ key: "deck", eq: deck }] })
  return slidesFrom(found)
}
