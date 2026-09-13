import { seatReset } from "akasha/commands/pages/seat/reset/seat-reset.command.ts"
import { seatResume } from "akasha/commands/pages/seat/resume/seat-resume.command.ts"
import { seatSupervisorStop } from "akasha/commands/pages/seat/supervisor/stop/seat-supervisor-stop.command.ts"
import { exportedAs } from "akasha/pages/modules/export-name/page-export-name.module.code.ts"

const FORCED = "--force"

const NOTICED = "--notice"

const EDITOR_REVIVE = "editor-revive"

const STARTED = "--start-mode"

const INTERACTIVE = "interactive"

export type SeatCall = {
  readonly slug: string
  readonly exported: string
  readonly args: readonly string[]
}

function asking(one: { readonly slug: string }, args: readonly string[]): SeatCall {
  return { slug: one.slug, exported: exportedAs(one.slug), args }
}

export function stopCall(name: string): SeatCall {
  return asking(seatSupervisorStop, [name, FORCED])
}

export function resetCall(name: string): SeatCall {
  return asking(seatReset, [name])
}

export function revivingCall(name: string): SeatCall {
  return asking(seatResume, [name, NOTICED, EDITOR_REVIVE])
}

export function interactiveCall(name: string): SeatCall {
  return asking(seatResume, [name, STARTED, INTERACTIVE])
}
