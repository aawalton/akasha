const NOTICES_SLUG = "seat-compose-notices"

const NOTICES_EXPORT = "seatComposeNotices"

const RESUME_SLUG = "seat-resume"

const RESUME_EXPORT = "seatResume"

const RESET_SLUG = "seat-reset"

const RESET_EXPORT = "seatReset"

const STOP_SLUG = "seat-supervisor-stop"

const STOP_EXPORT = "seatSupervisorStop"

const FORCED = "--force"

const PROMPTED = "--prompt"

const STARTED = "--start-mode"

const INTERACTIVE = "interactive"

export type SeatCall = {
  readonly slug: string
  readonly exported: string
  readonly args: readonly string[]
}

export const NOTICES_CALL: SeatCall = {
  slug: NOTICES_SLUG,
  exported: NOTICES_EXPORT,
  args: [],
}

export function stopCall(name: string): SeatCall {
  return { slug: STOP_SLUG, exported: STOP_EXPORT, args: [name, FORCED] }
}

export function resetCall(name: string): SeatCall {
  return { slug: RESET_SLUG, exported: RESET_EXPORT, args: [name] }
}

export function revivingCall(name: string, prompt: string): SeatCall {
  return { slug: RESUME_SLUG, exported: RESUME_EXPORT, args: [name, PROMPTED, prompt] }
}

export function interactiveCall(name: string): SeatCall {
  return { slug: RESUME_SLUG, exported: RESUME_EXPORT, args: [name, STARTED, INTERACTIVE] }
}
