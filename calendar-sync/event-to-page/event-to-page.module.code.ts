import type { CaldataEvent } from "../caldata-schema/caldata-schema.module.code.ts"
import { zonedWallClockToInstant } from "../zoned-time/zoned-time.module.code.ts"

export type MapContext = {
  timeZone: string
  providerClient: string
  nowMs: number
}

export type EventRow = Record<string, string | number | boolean | readonly string[]>

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

function asHttpUrl(value: string | null | undefined): string | null {
  const v = nonEmpty(value)
  return v != null && /^https?:\/\/.+/.test(v) ? v : null
}

function buildTitle(event: CaldataEvent): string {
  const sub = nonEmpty(event.sub_title)
  return sub != null ? `${event.title} — ${sub}` : event.title
}

function buildLocation(event: CaldataEvent): string | null {
  const location = nonEmpty(event.location)
  const venue = nonEmpty(event.venues)
  if (location != null && venue != null) return `${location} — ${venue}`
  return location ?? venue
}

function buildImageUrl(event: CaldataEvent, providerClient: string): string | null {
  const image = nonEmpty(event.image)
  if (image == null) return null
  return `https://${providerClient}.libnet.info/images/events/${providerClient}/${image}`
}

export function caldataEventToPageProps(event: CaldataEvent, ctx: MapContext): EventRow {
  const props: EventRow = {
    slug: event.id,
    title: buildTitle(event),
    externalId: event.id,
    allDay: nonEmpty(event.time_string) === "All day",
    registrationRequired: event.allow_reg === "1",
    ageGroups: event.agesArray ?? [],
    eventTypes: event.tagsArray ?? [],
    tags: event.search_tagsArray ?? [],
    lastSyncedAt: new Date(ctx.nowMs).toISOString(),
  }

  const startAt = zonedWallClockToInstant(event.raw_start_time, ctx.timeZone)
  if (startAt != null) props.startAt = new Date(startAt).toISOString()

  const endAt =
    event.raw_end_time != null ? zonedWallClockToInstant(event.raw_end_time, ctx.timeZone) : null
  if (endAt != null) props.endAt = new Date(endAt).toISOString()

  const description = nonEmpty(event.long_description) ?? nonEmpty(event.description)
  if (description != null) props.description = description

  const location = buildLocation(event)
  if (location != null) props.location = location

  const externalLink = asHttpUrl(event.url)
  if (externalLink != null) props.externalLink = externalLink

  const imageUrl = buildImageUrl(event, ctx.providerClient)
  if (imageUrl != null) props.imageUrl = imageUrl

  if (event.allow_reg === "1") {
    const regOpens =
      event.reg_opens != null ? zonedWallClockToInstant(event.reg_opens, ctx.timeZone) : null
    if (regOpens != null) props.registrationOpensAt = new Date(regOpens).toISOString()
    const regUrl = asHttpUrl(event.reg_url)
    if (regUrl != null) props.registrationUrl = regUrl
  }

  const maxAttendee = Number(nonEmpty(event.max_attendee) ?? "0")
  if (Number.isFinite(maxAttendee) && maxAttendee > 0) props.maxAttendees = maxAttendee

  return props
}
