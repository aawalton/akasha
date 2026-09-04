export const WORKING_KEY = "turn-working"

export const TURN_WORKING_COMPONENTS = ["active-turn", "compacting"] as const

export type TurnWorkingComponent = (typeof TURN_WORKING_COMPONENTS)[number]

export interface WorkingRecord {
  readonly value: boolean
  readonly at: number
}

export type TurnWorking = Partial<Record<TurnWorkingComponent, WorkingRecord>>

export function workingOn(working: TurnWorking): readonly TurnWorkingComponent[] {
  return TURN_WORKING_COMPONENTS.filter((one) => working[one]?.value === true)
}

export function anyWorking(working: TurnWorking): boolean {
  return workingOn(working).length > 0
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return TURN_WORKING_COMPONENTS.some((one) => working[one] !== undefined)
}

// WHETHER A SEAT IS MID-TURN IS UNREAD, AND SAYS SO. This stood beside the old page and nowhere
// else: akasha declares no `turn-working` property, so the write went to the one store, and the
// store has gone.
//
// Nothing is lost by that, because nothing was writing it. All six hooks that call `setWorking` are
// unregistered, and no sidecar in the fleet carried the key — checked across all eleven seats
// before this changed. It has been telling everything downstream "unread" for as long as it has
// been unregistered; it now says so from one line instead of from an empty read.
//
// UNREAD IS NOT OFF, and the difference is kept. `anyWorkingRead` answers false, so `tookATurn`
// falls through to what is pending and to the stamp rather than reading a seat as having taken no
// turn. `anyWorking` answers false, so no seat is reported working on the strength of a record
// nobody keeps.
//
// It comes back by declaring the property in akasha, naming it in `RECORDS`, and registering the
// hooks — in that order, because `keepBesideUnder` now refuses a key akasha does not declare rather
// than dropping the write.
export function workingOf(_agent: string): TurnWorking {
  return {}
}

export function setWorking(
  _agent: string,
  _values: Partial<Record<TurnWorkingComponent, boolean>>
): void {}

export function workingLines(working: TurnWorking): readonly string[] {
  return TURN_WORKING_COMPONENTS.map((one) => {
    const recorded = working[one]
    const said =
      recorded === undefined
        ? "— unread"
        : `${recorded.value ? "on" : "off"} (read ${new Date(recorded.at).toISOString()})`
    return `  ${one.padEnd(15)} ${said}`
  })
}
