import { seatNotice } from "akasha/person/properties/seat-notice.select-property.ts"
import type { SeatNotice } from "akasha/person/properties/seat-notice.select-property.types.ts"

export type Notice = SeatNotice

type Noticed = { readonly seat: string; readonly notice: Notice }

const NOTICES: readonly string[] = seatNotice.values

const UNSTATED: Notice = "both"

const PHONE: ReadonlySet<Notice> = new Set<Notice>(["phone", "both"])

const DESKTOP: ReadonlySet<Notice> = new Set<Notice>(["desktop", "both"])

export function isNotice(held: unknown): held is Notice {
  return typeof held === "string" && NOTICES.includes(held)
}

function noticesIn(held: unknown): readonly Noticed[] {
  if (!Array.isArray(held)) return []
  const kept: Noticed[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const { seat, notice } = one as Readonly<Record<string, unknown>>
    if (typeof seat === "string" && isNotice(notice)) kept.push({ seat, notice })
  }
  return kept
}

export function noticeFor(held: unknown, seat: string): Notice {
  return noticesIn(held).find((one) => one.seat === seat)?.notice ?? UNSTATED
}

export function noticesWith(held: unknown, seat: string, notice: Notice): readonly Noticed[] {
  return [...noticesIn(held).filter((one) => one.seat !== seat), { seat, notice }]
}

export function byPhone(notice: Notice): boolean {
  return PHONE.has(notice)
}

export function byDesktop(notice: Notice): boolean {
  return DESKTOP.has(notice)
}
