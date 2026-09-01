export interface EventInput {
  readonly calendarId?: string
  readonly summary: string
  readonly start: string
  readonly end: string
  readonly description?: string
  readonly location?: string
  readonly attendees?: readonly string[]
  readonly timezone?: string
  readonly recurrence?: readonly string[]
  readonly sendUpdates?: SendUpdates
}

export interface EventPatch {
  readonly calendarId?: string
  readonly eventId: string
  readonly summary?: string
  readonly start?: string
  readonly end?: string
  readonly description?: string
  readonly location?: string
  readonly attendees?: readonly string[]
  readonly timezone?: string
  readonly recurrence?: readonly string[]
  readonly sendUpdates?: SendUpdates
}

export interface ListEventsQuery {
  readonly calendarId?: string
  readonly from?: string
  readonly to?: string
  readonly query?: string
  readonly max?: number
}

export interface EventRef {
  readonly calendarId?: string
  readonly eventId: string
}

export type RsvpStatus = "accepted" | "declined" | "tentative"

export type SendUpdates = "all" | "externalOnly" | "none"

export interface RsvpInput {
  readonly calendarId?: string
  readonly eventId: string
  readonly status: RsvpStatus
  readonly sendUpdates?: SendUpdates
}

export interface NormalizedEvent {
  readonly id: string
  readonly calendarId: string
  readonly summary: string | undefined
  readonly start: string | undefined
  readonly end: string | undefined
  readonly htmlLink: string | undefined
  readonly status: string | undefined
  readonly recurrence: readonly string[] | undefined
}
